import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class BusquedaService {
  private url: string = `${environment.apiUrl}/api/SiteConsumer/GetNoticiasByKey?keyword=`;
  private keyword: string = "";
  private emitter = new Subject<void>();

  constructor(private http: HttpClient) {}

  public get(): string {
    return this.keyword;
  }

  public search(tag: string, page: number): Observable<any> {
    return this.http.get<any>(
      `${this.url}${this.keyword}&page=${page}&dateFilter=${tag}`
    );
  }

  public emit(keyword: string): void {
    this.keyword = keyword;
    this.emitter.next();
  }

  public receive(): Observable<void> {
    return this.emitter.asObservable();
  }
}
