import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Posgrado } from '../model/posgrado.model';

const UNIVERSIDADES: SelectItem[] = [
  {
      id: 1,
      descripcion: 'HOLANDA'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PosgradoService {

  public universidades$ = of(UNIVERSIDADES);
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Posgrado[]>(`${environment.apiUrl}/api/perfil/posgrado`);
  }

  insert(posgrado: Posgrado): Observable<IResponseService>  {
    return this.httpClient.post<IResponseService>(`${environment.apiUrl}/api/perfil/posgrado`, posgrado);
  }

  update(posgrado: Posgrado): Observable<IResponseService>  {
    return this.httpClient.put<IResponseService>(`${environment.apiUrl}/api/perfil/posgrado/${posgrado.id}`, posgrado);
  }

  delete(id: number): Observable<IResponseService>  {
    return this.httpClient.delete<IResponseService>(`${environment.apiUrl}/api/perfil/posgrado/${id}`);
  }
}
