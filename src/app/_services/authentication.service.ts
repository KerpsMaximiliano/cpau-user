import { RegisterNoMatriculado } from './../_models/register-nomatriculado.model';
import { RegisterMatriculado } from './../_models/register-matriculado.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private serverAuthen: boolean;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/user/login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  preregister(email: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/user/preregister`, {
      Email: email,
    });
  }

  preregisterconfirmacion(uid: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/user/preregisterconfirm`, {
      Uid: uid,
    });
  }

  register(data: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/user/register`, {
      model: data,
    });
  }

  registermatriculado(registerMatriculado: RegisterMatriculado)
  {
    return this.http.post<any>(`${environment.apiUrl}/api/user/registermatriculado`, {
      tipoMatricula: registerMatriculado.tipoMatricula,
      numeroMatricula: registerMatriculado.numeroMatricula,
      tipoDocumento: registerMatriculado.tipoDocumento,
      numeroDocumento: registerMatriculado.numeroDocumento,
      fechaNacimiento: registerMatriculado.fechaNacimiento,
      cuit: registerMatriculado.cuit,
      usuario: registerMatriculado.usuario,
      mail: registerMatriculado.mail,
      password: registerMatriculado.password,
    });
  }

  registernomatriculado(registerNoMatriculado: RegisterNoMatriculado)
  {
    return this.http.post<any>(`${environment.apiUrl}/api/user/registernomatriculado`, {
      nombre: registerNoMatriculado.nombre,
      apellido: registerNoMatriculado.apellido,
      cuit: registerNoMatriculado.cuit,
      mail: registerNoMatriculado.mail,
      tipoDocumento: registerNoMatriculado.tipoDocumento,
      numeroDocumento: registerNoMatriculado.numeroDocumento,
      usuario: registerNoMatriculado. usuario,
      password: registerNoMatriculado.password
    });
  }


  recover(userNameOrEmail: string, captcha: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/user/recover`, {
      UserOEmail: userNameOrEmail,
      Captcha: captcha
    });
  }

  confirm(email: string, token: string, pass: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/user/confirm`, {
      email,
      pass,
      token,
    });
  }

  validUserName(userName: string) {
    const params = new HttpParams().set('username', userName).set('nocache', 'true');
    return this.http.get<any>(`${environment.apiUrl}/api/user/validusername`, {
      params,
    });
  }

  isAuthenticated() {
    return this.http.get<any>(`${environment.apiUrl}/api/user/ExistToken`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    return this.http
      .post<any>(`${environment.apiUrl}/api/user/logout`, null)
      .subscribe((ret) => {
        this.currentUserSubject.next(null);
      });
  }
}
