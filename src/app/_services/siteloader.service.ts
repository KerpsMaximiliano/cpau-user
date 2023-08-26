import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ITemplate } from '@app/shared/abstract/factory/tempate.abstract';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { BannerModelSearch } from '@app/shared/Models/BannerModelSearch';
import { ModalHome } from '@app/_models/modalHome.model';
import { CustomResponse } from '@app/_models/customResponse.model';

const HttpOptionsDownloadFile = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType : 'blob' as 'json',
    observe: 'response' as 'body'
};

@Injectable({ providedIn: 'root' })
export class SiteLoader implements ITemplate {

    bannerSubject = new BehaviorSubject<BannerModelSearch>({ main: true, section: false, news: false });


    constructor(private http: HttpClient) {
    }

    getBanners(main: boolean, section: boolean, news: boolean) {
        return this.http
            .get<any>(`${environment.apiUrl}/api/SiteConsumer/GetCurrentBanners`)
            .pipe(distinctUntilChanged())
    }

    public get(sectionName, tag: string = ''): Observable<any> {
        let params = new HttpParams().set('nocache', 'true');
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/ListContentBySection?sectionName=${sectionName}&onlyBaseInfo=false&filterTag=${tag}`, { params: params })
        .pipe(distinctUntilChanged());
    }

    public getFullContent(id): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/Page?id=${id}`).pipe(distinctUntilChanged());
    }

    public getFullContentPreview(id): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/PagePreview?id=${id}`).pipe(distinctUntilChanged());
    }

    public getSearch(search): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetSearch?search=${search}`).pipe(distinctUntilChanged());
    }

    getSectionBySeName(sectionName) {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetByName?name=${sectionName}`).pipe(distinctUntilChanged());
    }

    GetMenusTo(sectionName) {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetMenusTo?sectionName=${sectionName}`).pipe(distinctUntilChanged());
    }

    GetSectionMenu() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetSectionMenu`).pipe(distinctUntilChanged());
    }

    GetMenusExtProd() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetMenusExtProd`).pipe(distinctUntilChanged());
    }

    getNews() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetUltimasSieteNoticias`).pipe(distinctUntilChanged());
    }
    getEvents() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetNextFiveEvents`).pipe(distinctUntilChanged());
    }
    getExternalProducts() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetExternalProducts`).pipe(distinctUntilChanged());
    }

    getNoticiasCarrousel() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetNoticiasCarrousel`).pipe(distinctUntilChanged());
    }

    getActividades() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetActividades`).pipe(distinctUntilChanged());
    }

    getFicha(guid) {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetFicha?guid=${guid}`).pipe(distinctUntilChanged());
    }

    getDatosPago(guid) {
        return this.http.get<any>(`${environment.apiUrl}/api/Matricula/DatosPagoCpauMail?hash=${guid}`).pipe(distinctUntilChanged());
    }

    getMatriculasTipos() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetTipoMatricula`).pipe(distinctUntilChanged());
    }

    getObraDestino() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetObraDestino`).pipe(distinctUntilChanged());
    }

    getProfesionales(codigoProfesion, filtro, actividades, obraDestino) {
        let params = new HttpParams()
            .set('codigoProfesion', codigoProfesion)
            .set('filtro', filtro)
            .set('actividades', actividades ? actividades.join(", ") : '')
            .set('obraDestino', obraDestino ? obraDestino.join(", ") : '');

        return this.http
            .get<any>(`${environment.apiUrl}/api/SiteConsumer/GetProfesional?codigoProfesion=${codigoProfesion}&filtro=${filtro}&actividades=${actividades ? actividades.join(", ") : ''}&obraDestino=${obraDestino ? obraDestino.join(", ") : ''}`)
            ;
    }

    generaContact(data: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/SiteConsumer/ContactoGeneral`, { 'model': data });
    }

    generaContactAnunciante(data: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/SiteConsumer/ContactoAnunciante`, { 'model': data });
    }

    professionalContact(data: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/SiteConsumer/ContactoProfesional`, { 'model': data });
    }

    boletin(id: number) {
        let params = new HttpParams()
            .set('id', id.toString())
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/PortalPublicBoletin`, { params: params });
    }

    getCV(guid,nombreArchivo, cb?: () => void) {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetCV?guid=${guid}`, HttpOptionsDownloadFile).pipe(distinctUntilChanged())
        .subscribe((resp: HttpResponse<Blob>) => {
          this.downloadFile(resp, nombreArchivo);
          if (cb) { cb(); }
        });
    }

    poseeCV(guid) {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/PoseeCV?guid=${guid}`).pipe(distinctUntilChanged());
    }

    downloadFile(resp: HttpResponse<Blob>, nombreArchivo: string) {
        const contentType = resp.headers.get('Content-type');
        const file = new Blob([ resp.body ], {type: contentType});
    
        // Explorador
        const ieEDGE = navigator.userAgent.match(/Edge/g);
        const ie = navigator.userAgent.match(/.NET/g); // IE 11+
        const oldIE = navigator.userAgent.match(/MSIE/g);
    
        // Descarga
        if (ie || oldIE || ieEDGE) {
          window.navigator.msSaveBlob(file, this.getContentDisposition(resp, nombreArchivo));
        } else {
          const fileURL = URL.createObjectURL(file);
          const a       = document.createElement('a');
          a.href        = fileURL;
          a.target      = '_blank';
          a.download    = this.getContentDisposition(resp, nombreArchivo);
          a.click();
          URL.revokeObjectURL(fileURL);
        }
    }

    getContentDisposition(resp: HttpResponse<Blob>, nombreArchivo: string): string {
        const contentDispositionHeader = resp.headers.get('content-disposition');
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    
        let filename: string;
        const matches = filenameRegex.exec(contentDispositionHeader);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
    
        return filename  ? filename : `Curriculum_${nombreArchivo}`;
    }

    readImage(guid) {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/profileImage?guid=${guid}`).pipe(distinctUntilChanged());
    }

}