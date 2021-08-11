import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Redes, RedesRequestModel } from '../models/redes.model';

@Injectable({
  providedIn: 'root'
})
export class RedesService {
  public tiposRedes$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/redSocial`);

  constructor(private httpClient: HttpClient) { }

  public insert(request: RedesRequestModel): Observable<IResponseService<Redes>> {
    return this.httpClient.post<IResponseService<Redes>>(`${environment.apiUrl}/api/perfil/contacto/redsocial`, request);
  }

  public update(request: RedesRequestModel): Observable<IResponseService<Redes>> {
    return this.httpClient.put<IResponseService<Redes>>(`${environment.apiUrl}/api/perfil/contacto/redsocial/${request.id}`, request);
  }

  public delete(id: number): Observable<IResponseService<Redes>> {
    return this.httpClient.delete<IResponseService<Redes>>(`${environment.apiUrl}/api/perfil/contacto/redsocial/${id}`);
  }

  public read(): Observable<Redes[]> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<Redes[]>(`${environment.apiUrl}/api/perfil/contacto/redsocial`, {params});
  }

}
