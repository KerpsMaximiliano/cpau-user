import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';

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
    constructor(private httpClient: HttpClient) { }

    public countries$ = of(COUNTRIES);

    public docTypes$ = of(DOCTYPES);
}
