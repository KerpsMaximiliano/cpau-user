import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ITemplate } from '@app/shared/abstract/factory/tempate.abstract';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { BannerModelSearch } from '@app/shared/Models/BannerModelSearch';
import { ModalHome } from '@app/_models/modalHome.model';
import { CustomResponse } from '@app/_models/customResponse.model';

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

    public get(sectionName): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/ListContentBySection?sectionName=${sectionName}&onlyBaseInfo=false`).pipe(distinctUntilChanged());
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

    getNews(sectionName, cant) {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/ListContentBySection?sectionName=${sectionName}&cant=${cant}`).pipe(distinctUntilChanged());
    }
    getEvents() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetNextFiveEvents`).pipe(distinctUntilChanged());
    }
    getExternalProducts() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetExternalProducts`).pipe(distinctUntilChanged());
    }

    getActividades() {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetActividades`).pipe(distinctUntilChanged());
    }

    getFicha(guid) {
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/GetFicha?guid=${guid}`).pipe(distinctUntilChanged());
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

    professionalContact(data: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/SiteConsumer/ContactoProfesional`, { 'model': data });
    }

    boletin(id: number) {
        let params = new HttpParams()
            .set('id', id.toString())
        return this.http.get<any>(`${environment.apiUrl}/api/SiteConsumer/PortalPublicBoletin`, { params: params });
    }


}