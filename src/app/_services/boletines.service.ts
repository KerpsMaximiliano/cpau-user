import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BoletinesService {
  constructor(private http: HttpClient) {}

  public getBoletines(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/Boletin/portal?dateFilter=todos&page=1`
    );
  }

  public getDate(date: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/Boletin/portal?dateFilter=${date}&page=1`
    );
  }

  public getPage(tag: string, page: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/Boletin/portal?dateFilter=${tag}&page=${page}`
    );
  }
}
