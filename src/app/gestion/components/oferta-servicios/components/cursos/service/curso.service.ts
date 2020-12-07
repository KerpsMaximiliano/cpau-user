import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Curso } from '../model/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Curso[]>(`${environment.apiUrl}/api/perfil/curso`);
  }

  insert(curso: Curso): Observable<IResponseService>  {
    return this.httpClient.post<IResponseService>(`${environment.apiUrl}/api/perfil/curso`, curso);
  }

  update(curso: Curso): Observable<IResponseService>  {
    return this.httpClient.put<IResponseService>(`${environment.apiUrl}/api/perfil/curso/${curso.id}`, curso);
  }

  delete(id: number): Observable<IResponseService>  {
    return this.httpClient.delete<IResponseService>(`${environment.apiUrl}/api/perfil/curso/${id}`);
  }
}
