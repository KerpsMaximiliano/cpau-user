import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    dynamicCSSUrl: string;
    dynamicCSSUrlCpau: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private sanitizer: DomSanitizer
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

        router.events.pipe(
            filter(event => event instanceof NavigationEnd)  
          ).subscribe((event: NavigationEnd) => {
            console.log('Log:');
            console.log(event.url);
            if (event.url == '/') {
                this.dynamicCSSUrl = '../stylesCustom/styles/bootstrap/bootstrap.css';
                this.dynamicCSSUrlCpau = '../stylesCustom/styles/cpau.css';
            } else if (event.url == '/gestion/home/perfil/identificacion') {
                this.dynamicCSSUrl = '../stylesCustom/styles/bootstrap/bootstrap.3.3.4.css';
            }
          });
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}