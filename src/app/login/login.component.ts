﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';

@Component(
        {
            templateUrl: 'login.component.html',
            styleUrls: [
                '../../stylesCustom/styles/login.css'
            ],
        }
    )
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            cbSavePass: [true, Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        var form = document.createElement("form");

        form.setAttribute("method", "post");
        form.setAttribute("action", `${environment.oldSiteUrl}/login`);
        //form.setAttribute("target", "_blank");
        var userName = document.createElement("input");
        userName.setAttribute("type", "hidden");
        userName.setAttribute("name", "UserName");
        userName.setAttribute("value", this.f.username.value);
        form.appendChild(userName);
        var password = document.createElement("input");
        password.setAttribute("type", "hidden");
        password.setAttribute("name", "Password");
        password.setAttribute("value", this.f.password.value);
        form.appendChild(password);
        var redirect = document.createElement("input");
        redirect.setAttribute("type", "hidden");
        redirect.setAttribute("name", "redirect");
        redirect.setAttribute("value", "/Perfil");
        form.appendChild(redirect);
        document.body.appendChild(form);
        form.submit();
    }
}
