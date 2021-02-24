import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActualizacionEmailService {

  constructor(private httpClient: HttpClient) { }

  emailconfirmacion(uid: string, contactId: string) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/perfil/contacto/email/emailconfirm`, {
      Uid: uid,
      ContactId: contactId
    });
  }
}
