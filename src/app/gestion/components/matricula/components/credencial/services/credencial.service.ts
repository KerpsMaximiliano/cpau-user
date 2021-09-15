import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
const HttpOptionsDownloadFile = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType : 'blob' as 'json',
  observe: 'response' as 'body',
  nocache: 'true'
};

@Injectable({
  providedIn: 'root'
})
export class CredencialService {

  allowGenerate(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiUrl}/api/perfil/PuedeGenerarCredencial`);
  }

  imprimirCertificado() {
    this.httpClient.get(`${environment.apiUrl}/api/perfil/generarCredencial?nocache=${Math.random()}`, HttpOptionsDownloadFile )
    .subscribe((resp: HttpResponse<Blob>) => {
      this.downloadFile(resp);
    });
  }

  downloadFile(resp: HttpResponse<Blob>) {
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
      a.download    = 'Credencial';
      a.click();
      URL.revokeObjectURL(fileURL);
    }
  }

  constructor(private httpClient: HttpClient) { }
}
