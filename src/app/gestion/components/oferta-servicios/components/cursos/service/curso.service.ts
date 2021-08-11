import { HttpClient, HttpParams } from '@angular/common/http';
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
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<Curso[]>(`${environment.apiUrl}/api/servicios/cursos`, {params});
  }

  insert(curso: Curso): Observable<IResponseService<Curso>>  {
    return this.httpClient.post<IResponseService<Curso>>(`${environment.apiUrl}/api/servicios/cursos`, curso);
  }

  update(curso: Curso): Observable<IResponseService<Curso>>  {
    return this.httpClient.put<IResponseService<Curso>>(`${environment.apiUrl}/api/servicios/cursos/${curso.id}`, curso);
  }

  delete(id: number): Observable<IResponseService<Curso>>  {
    return this.httpClient.delete<IResponseService<Curso>>(`${environment.apiUrl}/api/servicios/cursos/${id}`);
  }
}
