import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css','../../../../stylesCustom/styles/login.css']
})
export class ConfirmComponent implements OnInit {
  formsignin: FormGroup;
  ButtonText = "CONFIRMAR";
  loading = false;
  token : string;
  email : string;

  constructor(  private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.activatedRoute.queryParams
    .subscribe(params => {
      this.token = params.token;
      this.email = params.email;
    });

    this.formsignin = this.formBuilder.group({
      pass1: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(50),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,50}$')]],
      pass2: ['', Validators.required]
  });
  }

 // convenience getter for easy access to form fields
 get f() { return this.formsignin.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.formsignin.invalid) {
        this.formsignin.markAllAsTouched();
        return;
    }

    if(this.f.pass1.value != this.f.pass2.value) {
      document.getElementById('btnDatosIncorrectos').click();
      return;
    }

    this.loading = true;

    this.authenticationService.confirm(this.email,this.token, this.f.pass1.value)
        .pipe(first())
        .subscribe(
            data => {
               if(data) {
                   if(!data.success) {
                      document.getElementById('btnDatosIncorrectos').click();

                    if(data.message)
                      console.log(data);

                   } else {
                    this.ButtonText = "PROCESO COMPLETADO CON EXITO";

                    setTimeout(() => {
                      this.router.navigate(['/']);
                    }, 3000);
                   }
               }
            },
            error => {
                this.loading = false;
            });
}
}
