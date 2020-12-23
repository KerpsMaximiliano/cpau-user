import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Domicilio } from '../model/domicilio.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DomicilioService {
  constructor(private httpClient: HttpClient) { }

  public tiposDomicilios$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/tipoContacto`);

  getAll(): Observable<Domicilio[]> {
    return this.httpClient.get<Domicilio[]>(`${environment.apiUrl}/api/perfil/domicilio`);
  }

  insert(domicilio: Domicilio): Observable<IResponseService<Domicilio>> {
    return this.httpClient.post<IResponseService<Domicilio>>(`${environment.apiUrl}/api/perfil/domicilio`, domicilio);
  }

  update(domicilio: Domicilio): Observable<IResponseService<Domicilio>> {
    return this.httpClient.put<IResponseService<Domicilio>>(`${environment.apiUrl}/api/perfil/domicilio/${domicilio.id}`, domicilio);
  }

  delete(id: number): Observable<IResponseService<Domicilio>> {
    return this.httpClient.delete<IResponseService<Domicilio>>(`${environment.apiUrl}/api/perfil/domicilio/${id}`);
  }
}
