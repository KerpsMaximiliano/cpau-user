import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { Observable, of } from 'rxjs';
import { Telefono, TelefonoRequestModel } from '../models/telefono.model';




const TELEFONOS_TYPES: SelectItem[] = [
  {
    id: 1,
    descripcion: 'Particular'
  },
  {
    id: 2,
    descripcion: 'Laboral'
  },
  {
    id: 2,
    descripcion: 'Judicial'
  },
  {
    id: 0,
    descripcion: 'Otros'
  }
]

// Particular, Laboral, Judicial, Otros
@Injectable({
  providedIn: 'root'
})
export class TelefonoService {



  public tiposTelefonos$ = of(TELEFONOS_TYPES);

  constructor(private httpClient: HttpClient) { }



  public AddPhone(request: TelefonoRequestModel): Observable<Telefono> {
    return of({
      ...request,
      tipoDescripcion: 'Personal'
    } as Telefono);
  }
}
