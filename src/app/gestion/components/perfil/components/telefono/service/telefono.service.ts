import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Telefono, TelefonoRequestModel } from '../models/telefono.model';


@Injectable({
  providedIn: 'root'
})
export class TelefonoService {



  public tiposTelefonos$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/tipoContacto`);

  constructor(private httpClient: HttpClient) { }



  public insert(request: TelefonoRequestModel): Observable<IResponseService<Telefono>> {
    return this.httpClient.post<IResponseService<Telefono>>(`${environment.apiUrl}/api/perfil/contacto/telefono`, request);

  }

  public update(request: TelefonoRequestModel): Observable<IResponseService<Telefono>> {
    return this.httpClient.put<IResponseService<Telefono>>(`${environment.apiUrl}/api/perfil/contacto/telefono/${request.id}`, request);
  }


  public read(): Observable<Telefono[]> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<Telefono[]>(`${environment.apiUrl}/api/perfil/contacto/telefono`, {params});
  }

  public delete(id: number): Observable<IResponseService<Telefono>> {
    return this.httpClient.delete<IResponseService<Telefono>>(`${environment.apiUrl}/api/perfil/contacto/telefono/${id}`);
  }
}
