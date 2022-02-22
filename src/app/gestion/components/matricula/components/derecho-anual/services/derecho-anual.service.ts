import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { DerechoAnual } from '../models/derecho-anual.model';
import { DetalleDeuda } from '../models/detalle-deuda.model';

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

  pagarBoleta(CreditCardType, CreditCardInstallments): Observable<ValidarPago> {
    return this.httpClient.post<ValidarPago>(`${environment.apiUrl}/api/Matricula/pagarDerechoAnual`, { CreditCardType, CreditCardInstallments });
  }

  activarMatricula(): Observable<boolean> {
    const params = new HttpParams().set('nocache', 'true');
    return this.httpClient.get<boolean>(`${environment.apiUrl}/api/Matricula/activarMatricula`, {params});
  }

  imprimirBoleta(matricId: string, numero: string, tipo: string) {
    this.httpClient.get(`${environment.oldSiteUrl}/api/matriculados/imprimirboleta/${matricId}?nocache=${Math.random()}`, HttpOptionsDownloadFile )
    .subscribe((resp: HttpResponse<Blob>) => {
      this.downloadFile(resp, numero, tipo);
    });
  }

  downloadFile(resp: HttpResponse<Blob>, numero: string, tipo: string) {
    const contentType = resp.headers.get('Content-type');
    const file = new Blob([ resp.body ], {type: contentType});

    // Explorador
    const ieEDGE = navigator.userAgent.match(/Edge/g);
    const ie = navigator.userAgent.match(/.NET/g); // IE 11+
    const oldIE = navigator.userAgent.match(/MSIE/g);

    // Descarga
    if (ie || oldIE || ieEDGE) {
      window.navigator.msSaveBlob(file, 'Credencial');
    } else {
      const fileURL = URL.createObjectURL(file);
      const a       = document.createElement('a');
      a.href        = fileURL;
      a.target      = '_blank';
      a.download    = 'Boleta-' + tipo + '-' + numero;
      a.click();
      URL.revokeObjectURL(fileURL);
    }
  }

  

}
