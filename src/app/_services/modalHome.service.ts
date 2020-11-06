import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalHome } from '@app/_models/modalHome.model';
import { environment } from '@environments/environment';
import { distinctUntilChanged } from 'rxjs/operators';
import { CustomResponse } from '@app/_models/customResponse.model';

@Injectable({ providedIn: 'root' })
export class ModalHomeService {
    constructor(private httpClient: HttpClient) { }



    /**
     * getTodayModal
 : Observable<void>    */
    public getTodayModal(): Observable<CustomResponse<ModalHome>> {
        return this.httpClient.get<CustomResponse<ModalHome>>(`${environment.apiUrl}/api/ModalHome/todayModal`).pipe(distinctUntilChanged())
    }

}
