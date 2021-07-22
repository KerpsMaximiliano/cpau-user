import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Experiencia } from '../model/experiencia.model';

const DESTINO_OBRA: SelectItem[] = [
  {
    id: 1,
    nombre: 'Particular'
  },
  {
    id: 2,
    nombre: 'Laboral'
  },
  {
    id: 3,
    nombre: 'Judicial'
  },
  {
    id: 4,
    nombre: 'Otros'
  }
];

const TIPO_OBRA: SelectItem[] = [
  {
    id: 1,
    nombre: 'Normal'
  },
  {
    id: 2,
    nombre: 'Seco'
  },
  {
    id: 3,
    nombre: 'Hierro'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private httpClient: HttpClient) { }

  public destinosObra$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/GetObraDestino`);
  public tiposObra$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/TipoObra`);

  getAll() {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<Experiencia[]>(`${environment.apiUrl}/api/servicios/experiencia`, {params});
  }

  insert(experiencia: Experiencia): Observable<IResponseService<Experiencia>> {
    return this.httpClient.post<IResponseService<Experiencia>>(`${environment.apiUrl}/api/servicios/experiencia`, experiencia);
  }

  update(experiencia: Experiencia): Observable<IResponseService<Experiencia>> {
    return this.httpClient.put<IResponseService<Experiencia>>(`${environment.apiUrl}/api/servicios/experiencia/${experiencia.id}`, experiencia);
  }

  delete(id: number): Observable<IResponseService<Experiencia>> {
    return this.httpClient.delete<IResponseService<Experiencia>>(`${environment.apiUrl}/api/servicios/experiencia/${id}`);
  }
}
