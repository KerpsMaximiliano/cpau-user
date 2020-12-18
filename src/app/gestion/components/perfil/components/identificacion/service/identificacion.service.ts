import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Identificacion } from '../model/identificacion.model';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';

const COUNTRIES: SelectItem[] = [
    {
        id: 1,
        descripcion: 'Wakanda'
    },
    {
        id: 2,
        descripcion: 'Mordor'
    },
    {
        id: 3,
        descripcion: 'La Comarca'
    },
    {
        id: 4,
        descripcion: 'Narnia'
    },
    {
        id: 5,
        descripcion: 'Peronistan'
    },
];

const DOCTYPES: SelectItem[] = [
    {
        id: 1,
        descripcion: 'CI'
    },
    {
        id: 4,
        descripcion: 'DNI'
    },
    {
        id: 5,
        descripcion: 'LC'
    },
    {
        id: 6,
        descripcion: 'LE'
    },
    {
        id: 8,
        descripcion: 'Pasaporte'
    }
];

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

    public countries$ = of(COUNTRIES);

    public docTypes$ = of(DOCTYPES);

    getCurrentIdentificacionValue(): Observable<Identificacion> {
        return this.currentIdentificacionSubject.asObservable();
    }

    public set currentIdentificacionValue(v : Identificacion) {
        this.currentIdentificacionSubject.next(v);
    }
    

    public read(): Observable<Identificacion> {
        return this.httpClient.get<Identificacion>(`${environment.apiUrl}/api/perfil/identificacion`);
    }

    public update(request: Identificacion): Observable<IResponseService<Identificacion>> {
        return this.httpClient.put<IResponseService<Identificacion>>(`${environment.apiUrl}/api/perfil/identificacion`, request);
    }

}
