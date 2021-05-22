import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Mail, MailRequestModel } from '../models/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  public tiposMails$ = this.httpClient.get<SelectItem[]>(`${environment.apiUrl}/api/siteConsumer/tipoContacto`);

  constructor(private httpClient: HttpClient) { }

  public insert(request: MailRequestModel): Observable<IResponseService<Mail>> {
    return this.httpClient.post<IResponseService<Mail>>(`${environment.apiUrl}/api/perfil/contacto/email`, request);

  }

  public update(request: MailRequestModel): Observable<IResponseService<Mail>> {
    return this.httpClient.put<IResponseService<Mail>>(`${environment.apiUrl}/api/perfil/contacto/email/${request.id}`, request);
  }


  public read(): Observable<Mail[]> {
    return this.httpClient.get<Mail[]>(`${environment.apiUrl}/api/perfil/contacto/email`);
  }

  public delete(id: number): Observable<IResponseService<Mail>> {
    return this.httpClient.delete<IResponseService<Mail>>(`${environment.apiUrl}/api/perfil/contacto/email/${id}`);
  }
}
