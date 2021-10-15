import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IResponseService } from "@app/gestion/shared/Models/ResponseService.model";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { Inscripcion } from "../model/inscripciones";


@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Inscripcion[]> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<Inscripcion[]>(`${environment.apiUrl}/api/perfil/InscripcionesVigentes`, {params});
  }

}
