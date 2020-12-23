import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/api/matricula/datosbasicos`);
  }
}
