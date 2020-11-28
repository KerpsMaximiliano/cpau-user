import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Domicilio } from '../model/domicilio.model';

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

  getAll() {
    return this.httpClient.get<Domicilio[]>(`${environment.apiUrl}/api/perfil/domicilio`);
  }

  insert(domicilio: Domicilio): Observable<IResponseService>  {
    return this.httpClient.post<IResponseService>(`${environment.apiUrl}/api/perfil/domicilio`, domicilio);
  }

  update(domicilio: Domicilio): Observable<IResponseService>  {
    return this.httpClient.put<IResponseService>(`${environment.apiUrl}/api/perfil/domicilio/${domicilio.id}`, domicilio);
  }

  delete(id: number): Observable<IResponseService>  {
    return this.httpClient.delete<IResponseService>(`${environment.apiUrl}/api/perfil/domicilio/${id}`);
  }
}
