import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  getRequestOptions() {
    return { options: { responseType: 'text' }};
  }

  constructor(private httpClient: HttpClient) { }

  public update(request: Usuario): Observable<IResponseService<Usuario>> {
    return this.httpClient.put<IResponseService<Usuario>>(`${environment.apiUrl}/api/perfil/username`, request);
  }

  public read(): Observable<string> {
    return this.httpClient.get<string>(`${environment.apiUrl}/api/perfil/username`, {responseType: 'text' as 'json'});
  }

}
