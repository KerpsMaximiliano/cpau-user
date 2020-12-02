import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Resumen } from '../models/resumen.model';


const RESUMEN: Resumen[] = [
  {
    id: 1,
    titulo: 'Tipo de matrícula:',
    valor: 'Registro decreto 0000/11'
  },
  {
    id: 2,
    titulo: 'Número de matrícula:',
    valor: '800051'
  },
  {
    id: 3,
    titulo: 'Fecha de matriculación:',
    valor: '01/12/2020'
  },
  {
    id: 4,
    titulo: 'Estado:',
    valor: 'ACTIVO'
  },
  {
    id: 5,
    titulo: 'Universidad:',
    valor: ''
  },
  {
    id: 6,
    titulo: 'Fecha de egreso:',
    valor: '31/12/2020'
  },
];

@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    // return this.httpClient.get<Domicilio[]>(`${environment.apiUrl}/api/perfil/domicilio`);
    return of(RESUMEN);
  }
}
