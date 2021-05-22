import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Suscripcion } from '../Models/suscipcion.model';
import { Observable } from 'rxjs';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';

@Injectable({ providedIn: 'root' })
export class SuscripcionService {
    constructor(private httpClient: HttpClient) { }

    public getSuscripciones(): Observable<Suscripcion[]> {
        return this.httpClient.get<Suscripcion[]>(`${environment.apiUrl}/api/Suscripcion`);
    }

    public savePublicaciones(request: Suscripcion[]): Observable<IResponseService<void>> {
        return this.httpClient.post<IResponseService<void>>(`${environment.apiUrl}/api/Suscripcion/publicaciones`, request);
    }
    public saveNewsletter(request: Suscripcion[]): Observable<IResponseService<void>> {
        return this.httpClient.post<IResponseService<void>>(`${environment.apiUrl}/api/Suscripcion/newsletter`, request);
    }
}