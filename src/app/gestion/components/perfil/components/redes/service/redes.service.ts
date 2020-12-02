import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { Observable, of } from 'rxjs';
import { RedesRequestModel } from '../models/redes.model';


const REDES_TYPES: SelectItem[] = [
  {
    id: 1,
    descripcion: 'Facebook'
  },
  {
    id: 2,
    descripcion: 'Instagram'
  },
  {
    id: 3,
    descripcion: 'Pinterest'
  },
  {
    id: 4,
    descripcion: 'Twitter'
  }
];

@Injectable({
  providedIn: 'root'
})
export class RedesService {
  public tiposRedes$ = of(REDES_TYPES);

  constructor(private httpClient: HttpClient) { }

  public insert(request: RedesRequestModel): Observable<IResponseService> {
    return of();
  }

  public update(request: RedesRequestModel): Observable<IResponseService> {
    return of();
  }

  public delete(id: number): Observable<IResponseService> {
    return of();
  }
}