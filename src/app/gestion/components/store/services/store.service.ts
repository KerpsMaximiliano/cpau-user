import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProductos(categoriaId?, orderBy?): Observable<any> {
    let params = new HttpParams().set("nocache", "true");
    if (categoriaId && categoriaId !== "todos") {
      params = params.append("categoriaId", categoriaId.toString());
    }
    if (orderBy) {
      params = params.append("orderBy", orderBy);
    }
    return this.httpClient.get(`${environment.apiUrl}/api/store/productos`, {
      params,
    });
  }

  getAllCategorias(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/Store/Categorias`);
  }

  getProductoById(id): Observable<any> {
    return this.httpClient.get(
      `${environment.apiUrl}/api/store/producto/${id}`
    );
  }

  getProductoTemporalByToken(hash): Observable<any> {
    return this.httpClient.get(
      `${environment.apiUrl}/api/store/productoTemporal/${hash}`
    );
  }

  getDatosEnvio(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/Store/DatosEnvio`);
  }

  postCheckout(
    productos,
    tarjeta,
    cuotas,
    solicitaEnvio,
    nombreEnvio,
    domicilio
  ): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/store/checkout`, {
      productos,
      tarjeta,
      cuotas,
      solicitaEnvio,
      nombreEnvio,
      domicilio,
    });
  }

  public get(value: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiUrl}/api/store/productos?busquedaRapida=${
        value ? value : ""
      }`
    );
  }
}
