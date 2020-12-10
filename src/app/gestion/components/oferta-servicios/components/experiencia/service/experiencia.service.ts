import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Experiencia } from '../model/experiencia.model';

const DESTINO_OBRA: SelectItem[] = [
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

const TIPO_OBRA: SelectItem[] = [
  {
      id: 1,
      descripcion: 'Normal'
  },
  {
      id: 2,
      descripcion: 'Seco'
  },
  {
      id: 3,
      descripcion: 'Hierro'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private httpClient: HttpClient) { }

  public destinosObra$ = of(DESTINO_OBRA);
  public tiposObra$ = of(TIPO_OBRA);

  getAll() {
    return this.httpClient.get<Experiencia[]>(`${environment.apiUrl}/api/perfil/experiencia`);
  }

  insert(experiencia: Experiencia): Observable<IResponseService>  {
    return this.httpClient.post<IResponseService>(`${environment.apiUrl}/api/perfil/experiencia`, experiencia);
  }

  update(experiencia: Experiencia): Observable<IResponseService>  {
    return this.httpClient.put<IResponseService>(`${environment.apiUrl}/api/perfil/experiencia/${experiencia.id}`, experiencia);
  }

  delete(id: number): Observable<IResponseService>  {
    return this.httpClient.delete<IResponseService>(`${environment.apiUrl}/api/perfil/experiencia/${id}`);
  }
}
