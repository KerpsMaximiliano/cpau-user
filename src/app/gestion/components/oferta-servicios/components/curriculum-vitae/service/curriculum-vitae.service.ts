import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseService } from '@app/gestion/shared/Models/ResponseService.model';
import { AuthenticationService, UserService } from '@app/_services';
import { environment } from '@environments/environment';
import { Observable, Subscription } from 'rxjs';

const HttpOptionsDownloadFile = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType : 'blob' as 'json',
  observe: 'response' as 'body'
};

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaeService {

  constructor(private httpClient: HttpClient,
    private authenticationService: AuthenticationService) { }

  getAll(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiUrl}/api/servicios/curriculumexistente`);
  }

  insert(file: File): Observable<IResponseService<any>>  {
    return this.httpClient.post<IResponseService<any>>(`${environment.apiUrl}/api/servicios/curriculum`, { userId: 1, archivoPdf: file});
  }

  getDownloadFile(): void {
    this.httpClient.get(`${environment.apiUrl}/api/servicios/curriculum`, HttpOptionsDownloadFile )
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
    const contentDispositionHeader = resp.headers.get('content-disposition');
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

    let filename: string;
    const matches = filenameRegex.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }

    return filename  ? filename : `Curriculum_${this.authenticationService.currentUserValue.username}`;
  }
}
