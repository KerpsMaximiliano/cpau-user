import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "@environments/environment";
import { AuthenticationService } from "@app/_services";

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
    private authenticationService: AuthenticationService
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

            setTimeout(() => {
              var form = document.createElement("form");

              form.setAttribute("method", "post");
              form.setAttribute(
                "action",
                `${environment.oldSiteUrl}/login?tkn=${data.token}`
                //`/login?tkn=${data.token}`
              );
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
              if(this.returnUrl === "/")
                redirect.setAttribute("value", `/Perfil?tkn=${data.token}`);
              else
                redirect.setAttribute("value", `/` + this.returnUrl);
              form.appendChild(redirect);
              document.body.appendChild(form);
              form.submit();
            }, 1000);
          } else {
            document.getElementById("btnDatosIncorrectos").click();
            console.log(data);
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
