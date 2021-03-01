import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

const HttpOptionsDownloadFile = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType : 'blob' as 'json',
    observe: 'response' as 'body'
  };

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(private httpClient: HttpClient) { }

  imprimirCertificado() {
    this.httpClient.get(`${environment.apiUrl}/api/matricula/generarCertificadoPDF`, HttpOptionsDownloadFile )
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
      window.navigator.msSaveBlob(file, this.getContentDisposition(resp));
    } else {
      const fileURL = URL.createObjectURL(file);
      const a       = document.createElement('a');
      a.href        = fileURL;
      a.target      = '_blank';
      a.download    = this.getContentDisposition(resp);
      a.click();
      URL.revokeObjectURL(fileURL);
    }
  }

  getContentDisposition(resp: HttpResponse<Blob>): string {
    const contentDispositionHeader = resp.headers.get('Content-Disposition');
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

    let filename: string;
    const matches = filenameRegex.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }

    return filename;
  }
}
