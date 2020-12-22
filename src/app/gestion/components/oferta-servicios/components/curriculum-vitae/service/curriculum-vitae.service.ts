import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaeService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/api/servicios/curriculum`);
  }

  insert(file: File): Observable<IResponseService<string>>  {
    return this.httpClient.post<IResponseService<string>>(`${environment.apiUrl}/api/servicios/curriculum`, file);
  }
}
