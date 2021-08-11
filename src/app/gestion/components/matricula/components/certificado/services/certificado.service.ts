import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Certificado } from '../model/certificado';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  allowGenerate(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiUrl}/api/perfil/PuedeGenerarCertificado`);
  }

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Certificado[]> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<Certificado[]>(`${environment.apiUrl}/api/perfil/matricula/certificado`, {params});
  }

  insert(): Observable<IResponseService<Certificado>> {
    return this.httpClient.post<IResponseService<Certificado>>(`${environment.apiUrl}/api/perfil/matricula/certificado`, null);
  }
}
