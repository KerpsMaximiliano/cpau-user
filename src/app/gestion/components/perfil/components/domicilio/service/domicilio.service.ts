import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { of } from 'rxjs';

const TIPOS_DOMICILIO: SelectItem[] = [
  {
      id: 1,
      descripcion: 'Particular'
  },
  {
      id: 2,
      descripcion: 'Laboral'
  },
  {
      id: 3,
      descripcion: 'Judicial'
  },
  {
      id: 4,
      descripcion: 'Otros'
  }
];

@Injectable(
  {
      providedIn: 'root'
  }
)
export class DomicilioService {
  constructor(private httpClient: HttpClient) { }

  public tiposDomicilios$ = of(TIPOS_DOMICILIO);
}
