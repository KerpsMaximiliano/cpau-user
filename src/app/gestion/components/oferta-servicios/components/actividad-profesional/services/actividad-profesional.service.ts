import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActividadProfesional, Obras } from '../models/actividad-profesiona.model';
import { environment } from '@environments/environment';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';

@Injectable({ providedIn: 'root' })
export class ActividadProfesionalService {
    constructor(private httpClient: HttpClient) { }

    public getActividadProfesional(): Observable<ActividadProfesional[]> {
        return this.httpClient.get<ActividadProfesional[]>(`${environment.apiUrl}/api/servicios/actividadprofesional`);
    }

    public getObras(): Observable<Obras[]> {
        return this.httpClient.get<Obras[]>(`${environment.apiUrl}/api/servicios/obrasrealizadas`);
    }

    public guardarActividadProfesional(request: any): Observable<IResponseService<ActividadProfesional>> {
        return this.httpClient.put<IResponseService<ActividadProfesional>>(`${environment.apiUrl}/api/servicios/actividadprofesional`, request);
    }

    public guardarObrasRealizada(request: any): Observable<IResponseService<ActividadProfesional>> {
        return this.httpClient.put<IResponseService<ActividadProfesional>>(`${environment.apiUrl}/api/servicios/obrasrealizadas`, request);
    }
}