import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActividadProfesionalRequestModel, ObrasRequestModel } from '../models/actividad-profesiona.model';
import { environment } from '@environments/environment';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { CheckBoxDataModel } from '@app/shared/components/checkbox-list/models/CheckboxList.model';

@Injectable({ providedIn: 'root' })
export class ActividadProfesionalService {
    constructor(private httpClient: HttpClient) { }

    public getActividadProfesional(): Observable<CheckBoxDataModel[]> {
        return this.httpClient.get<CheckBoxDataModel[]>(`${environment.apiUrl}/api/servicios/actividadprofesional`);
    }

    public getObras(): Observable<CheckBoxDataModel[]> {
        return this.httpClient.get<CheckBoxDataModel[]>(`${environment.apiUrl}/api/servicios/obrasrealizadas`);
    }

    public guardarActividadProfesional(request: ActividadProfesionalRequestModel): Observable<IResponseService<void>> {
        return this.httpClient.put<IResponseService<void>>(`${environment.apiUrl}/api/servicios/actividadprofesional`, request);
    }

    public guardarObrasRealizada(request: ObrasRequestModel): Observable<IResponseService<void>> {
        return this.httpClient.put<IResponseService<void>>(`${environment.apiUrl}/api/servicios/obrasrealizadas`, request);
    }
}