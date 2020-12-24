import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Contrasenia } from '../models/contrasenia.model';

@Injectable({
  providedIn: 'root'
})
export class ContraseniaService {

  constructor(private httpClient: HttpClient) { }

  public update(request: Contrasenia): Observable<any> {
      return this.httpClient.put<any>(`${environment.apiUrl}/api/perfil/passwordupdate`, request);
  }
}
