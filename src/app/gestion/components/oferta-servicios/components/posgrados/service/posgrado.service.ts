import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Posgrado } from '../model/posgrado.model';

const UNIVERSIDADES: SelectItem[] = [
  {
    id: 1,
    nombre: 'HOLANDA'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PosgradoService {

  public universidades$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/Universidades`);
  constructor(private httpClient: HttpClient) { }

  getAll() {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<Posgrado[]>(`${environment.apiUrl}/api/servicios/postgrados`, {params});
  }

  insert(posgrado: Posgrado): Observable<IResponseService<Posgrado>> {
    return this.httpClient.post<IResponseService<Posgrado>>(`${environment.apiUrl}/api/servicios/postgrados`, posgrado);
  }

  update(posgrado: Posgrado): Observable<IResponseService<Posgrado>> {
    return this.httpClient.put<IResponseService<Posgrado>>(`${environment.apiUrl}/api/servicios/postgrados/${posgrado.id}`, posgrado);
  }

  delete(id: number): Observable<IResponseService<Posgrado>> {
    return this.httpClient.delete<IResponseService<Posgrado>>(`${environment.apiUrl}/api/servicios/postgrados/${id}`);
  }
}
