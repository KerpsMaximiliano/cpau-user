import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { DerechoAnual } from '../models/derecho-anual.model';
import { ValidarPago } from '../models/validar-pago.model';

const DERECHO_ANUALES: DerechoAnual[] = [
  {
    id: 1,
    concepto: 'Derecho anual: 2003',
    monto: 7200.00
  },
  {
    id: 2,
    concepto: 'Derecho anual: 2004',
    monto: 7200.00
  },
  {
    id: 3,
    concepto: 'Derecho anual: 2005',
    monto: 7200.00
  },
  {
    id: 4,
    concepto: 'Derecho anual: 2006',
    monto: 7200.00
  },
  {
    id: 5,
    concepto: 'Derecho anual: 2007',
    monto: 7200.00
  },
];

@Injectable({
  providedIn: 'root'
})
export class DerechoAnualService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<DerechoAnual[]> {
    return this.httpClient.get<DerechoAnual[]>(`${environment.apiUrl}/api/matricula/obtenerDeuda`);

  }

  pagarBoleta(CreditCardType, CreditCardInstallments): Observable<ValidarPago> {
    return this.httpClient.post<ValidarPago>(`${environment.apiUrl}/api/Matricula/pagarDerechoAnual`, { CreditCardType, CreditCardInstallments });
  }
}
