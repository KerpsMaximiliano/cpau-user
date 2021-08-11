import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Resumen } from '../models/resumen.model';


@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Resumen> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<Resumen>(`${environment.apiUrl}/api/matricula/datosbasicos`, {params});
  }
}
