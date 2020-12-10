import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { Mail, MailRequestModel } from '../models/mail.model';

const MAILS_TYPES: SelectItem[] = [
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
export class MailService {

  public tiposMails$ = of(MAILS_TYPES);

  constructor(private httpClient: HttpClient) { }

  public insert(request: MailRequestModel): Observable<IResponseService> {
    return this.httpClient.put<IResponseService>(`${environment.apiUrl}/api/perfil/contacto/email/${request.id}`, request);

  }

  public update(request: MailRequestModel): Observable<IResponseService> {
    return this.httpClient.put<IResponseService>(`${environment.apiUrl}/api/perfil/contacto/email/${request.id}`, request);
  }


  public read(): Observable<Mail[]> {
    return this.httpClient.get<Mail[]>(`${environment.apiUrl}/api/perfil/contacto/email`);
  }

  public delete(id: number): Observable<IResponseService> {
    return this.httpClient.delete<IResponseService>(`${environment.apiUrl}/api/perfil/contacto/email/${id}`);
  }
}
