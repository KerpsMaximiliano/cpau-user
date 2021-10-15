import { Component, Inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "@app/_services";
import { DOCUMENT } from "@angular/common";

@Component({
  templateUrl: "login.component.html",
  styleUrls: ["../../stylesCustom/styles/login.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      cbSavePass: [true, Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["redirect"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (data) => {
          if (!data.error) {
            console.log(localStorage.getItem("currentUser"));

            this.authenticationService.loginOldSite(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(ol => {
            });
            var returnUrl = this.route.snapshot.queryParams["returnUrl"];
            var redirect = this.route.snapshot.queryParams["redirect"];
            if (returnUrl) {
              this.router.navigate([returnUrl]);
            } else if (redirect) {
              this.document.location.href = redirect;
            } else {
              this.router.navigate([`gestion/home/perfil/identificacion`]);
            }
          } else {
            document.getElementById("btnDatosIncorrectos").click();
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
