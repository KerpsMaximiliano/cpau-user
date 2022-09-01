import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getForm(id: number) {
    const formId = id.toString();
    return this.http.get<any>(`${environment.apiUrl}/api/Form/Render/${formId}`);
  }

  sendForm (idForm , fields) {
    fields = JSON.stringify(fields)
    return this.http.post<any>(`${environment.apiUrl}/api/formresponse`, {
      formId: idForm,
      fields: fields,
    });
  }

  getUid(uid: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/Form/Constancia/${uid}`);
  }

}
