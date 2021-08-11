import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { DerechoAnual } from '../models/derecho-anual.model';
import { ValidarPago } from '../models/validar-pago.model';
@Injectable({
  providedIn: 'root'
})
export class DerechoAnualService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<DerechoAnual[]> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<DerechoAnual[]>(`${environment.apiUrl}/api/matricula/obtenerDeuda`, {params});

  }

  pagarBoleta(CreditCardType, CreditCardInstallments): Observable<ValidarPago> {
    return this.httpClient.post<ValidarPago>(`${environment.apiUrl}/api/Matricula/pagarDerechoAnual`, { CreditCardType, CreditCardInstallments });
  }
}
