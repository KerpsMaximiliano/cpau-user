import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Telefono, TelefonoRequestModel } from '../models/telefono.model';




const TELEFONOS_TYPES: SelectItem[] = [
  {
    id: 1,
    descripcion: 'Particular'
  },
  {
    id: 2,
    descripcion: 'Laboral'
  },
  {
    id: 2,
    descripcion: 'Judicial'
  },
  {
    id: 0,
    descripcion: 'Otros'
  }
]

@Injectable({
  providedIn: 'root'
})
export class TelefonoService {



  public tiposTelefonos$ = of(TELEFONOS_TYPES);

  constructor(private httpClient: HttpClient) { }



  public insert(request: TelefonoRequestModel): Observable<IResponseService<Telefono>> {
    return this.httpClient.post<IResponseService<Telefono>>(`${environment.apiUrl}/api/perfil/contacto/telefono`, request);

  }

  public update(request: TelefonoRequestModel): Observable<IResponseService<Telefono>> {
    return this.httpClient.put<IResponseService<Telefono>>(`${environment.apiUrl}/api/perfil/contacto/telefono/${request.id}`, request);
  }


  public read(): Observable<Telefono[]> {
    return this.httpClient.get<Telefono[]>(`${environment.apiUrl}/api/perfil/contacto/telefono`);
  }

  public delete(id: number): Observable<IResponseService<Telefono>> {
    return this.httpClient.delete<IResponseService<Telefono>>(`${environment.apiUrl}/api/perfil/contacto/telefono/${id}`);
  }
}
