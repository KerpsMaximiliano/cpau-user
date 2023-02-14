import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { DerechoAnual } from '../models/derecho-anual.model';

import { ValidarPago } from '../models/validar-pago.model';

const HttpOptionsDownloadFile = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType : 'blob' as 'json',
  observe: 'response' as 'body',
  nocache: 'true'
};

@Injectable({
  providedIn: 'root'
})
export class DerechoAnualService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<DerechoAnual> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<DerechoAnual>(`${environment.apiUrl}/api/matricula/obtenerDeuda`, {params});
  }

  hasRecibo(): Observable<boolean> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<boolean>(`${environment.apiUrl}/api/Matricula/hasRecibo`, {params});
  }

  pagarBoleta(CreditCardType, CreditCardInstallments) : Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/Matricula/pagarDerechoAnual`, { CreditCardType, CreditCardInstallments });
  }

  activarMatricula(): Observable<boolean> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<boolean>(`${environment.apiUrl}/api/Matricula/activarMatricula`, {params});
  }

  imprimirBoleta(matricId: string, numero: string, tipo: string) {
	this.httpClient.get(`${environment.apiUrl}/api/matriculado/GenerarBoleta`, HttpOptionsDownloadFile )    .subscribe((resp: HttpResponse<Blob>) => {
      var name = 'Boleta-' + tipo + '-' + numero;
      this.downloadFile(resp, name);
    });
  }

  imprimirRecibo() {
    this.httpClient.get(`${environment.apiUrl}/api/Matricula/GenerarUltimoRecibo`, HttpOptionsDownloadFile )    .subscribe((resp: HttpResponse<Blob>) => {
        var name = 'Recibo';
        if (resp.body != null) {
          this.downloadFile(resp, name);
        } else {
          alert('No hay recibo');
        }
      });
    }

  downloadFile(resp: HttpResponse<Blob>, name: string) {
    const contentType = resp.headers.get('Content-type');
    const file = new Blob([ resp.body ], {type: contentType});

    // Explorador
    const ieEDGE = navigator.userAgent.match(/Edge/g);
    const ie = navigator.userAgent.match(/.NET/g); // IE 11+
    const oldIE = navigator.userAgent.match(/MSIE/g);

    // Descarga
    if (ie || oldIE || ieEDGE) {
      window.navigator.msSaveBlob(file, name);
    } else {
      const fileURL = URL.createObjectURL(file);
      const a       = document.createElement('a');
      a.href        = fileURL;
      a.target      = '_blank';
      a.download    = name;
      a.click();
      URL.revokeObjectURL(fileURL);
    }
  }

  

}
