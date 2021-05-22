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
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}