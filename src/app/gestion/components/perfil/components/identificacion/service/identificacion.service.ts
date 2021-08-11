import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Identificacion } from '../model/identificacion.model';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class IdentificacionService {
    private currentIdentificacionSubject: BehaviorSubject<Identificacion>;

    constructor(private httpClient: HttpClient) {
        this.currentIdentificacionSubject = new BehaviorSubject<Identificacion>(null);
    }

    public countries$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/pais`);

    public docTypes$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/tipoDocumento`);

    getCurrentIdentificacionValue(): Observable<Identificacion> {
        return this.currentIdentificacionSubject.asObservable();
    }

    public set currentIdentificacionValue(v: Identificacion) {
        this.currentIdentificacionSubject.next(v);
    }

    public readImage(): Observable<IResponseService<any>> {
        return this.httpClient.get<IResponseService<any>>(`${environment.apiUrl}/api/perfil/profileImage`);
    }

    public read(): Observable<Identificacion> {
        const params = new HttpParams().set('nocache', 'true');
        return this.httpClient.get<Identificacion>(`${environment.apiUrl}/api/perfil/identificacion`, {params});
    }

    public update(request: Identificacion): Observable<IResponseService<Identificacion>> {
        return this.httpClient.put<IResponseService<Identificacion>>(`${environment.apiUrl}/api/perfil/identificacion`, request);
    }

}
