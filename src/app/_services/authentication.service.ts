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

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/user/login`, { 'username': username, 'password':password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    register(data: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/user/register`, { 'model': data });
    }

    recover(userNameOrEmail: string) {
        return this.http.post<any>
        (`${environment.apiUrl}/api/user/recover`, { 'UserOEmail': userNameOrEmail });
    }

    confirm(email: string, token: string, pass: string) {
        return this.http.post<any>
        (`${environment.apiUrl}/api/user/confirm`, { 'email': email, 'pass': pass, 'token':token});
    }

    validUserName(userName: string) {
        let params = new HttpParams().set( 'username', userName );
        return this.http.get<any>
        (`${environment.apiUrl}/api/user/validusername`, { params: params });
    }

    isAuthenticated() {
        var user = localStorage.getItem('currentUser');

        if(user) {
            return true;
        }

        return false;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}