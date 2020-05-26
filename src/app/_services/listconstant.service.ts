import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ListConstantService {

    constructor(private http: HttpClient) {
    }

    getMatriculaTipos() {
        return this.http.get<any>(`${environment.apiUrl}/api/matricula/getmatriculatipos`);
    }

    getDocTipos() {
        return this.http.get<any>(`${environment.apiUrl}/api/matricula/GetTipDocumentos`);
    }

    checkMatricula( t, n) {
        let params = new HttpParams().set('numero', n).set('tipo', t).set('nocache', 'true');
        return this.http.get<any>(`${environment.apiUrl}/api/matricula/CheckMatricula`, { params: params })
        .pipe(
            debounceTime(1000),
            distinctUntilChanged()
          );
    }

    validMatricula( typeM, numMat, typeDoc, numDoc) {
        let params = new HttpParams().set('numero', numMat).set('tipo', typeM).set('docTypeId', typeDoc).set('numDoc', numDoc).set('nocache', 'true');
        return this.http.get<any>(`${environment.apiUrl}/api/matricula/ValMatricula`, { params: params })
        .pipe(
            debounceTime(1000),
            distinctUntilChanged()
          );
    }

}