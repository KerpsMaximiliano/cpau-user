import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css','../../../stylesCustom/styles/login.css']
})
export class RecoverComponent implements OnInit {

  formsignin: FormGroup;
  ButtonText = "RECUPERAR";
  loading = false;
  errorCode = undefined;
  buttonDisabled = false;

  constructor( private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.formsignin = this.formBuilder.group({
      email: ['', Validators.required],
      captcha: new FormControl('', [Validators.required])
  });
  }

 // convenience getter for easy access to form fields
 get f() { return this.formsignin.controls; }

  onSubmit() {

    if (this.formsignin.value.captcha == null || this.formsignin.value.captcha.trim() == '') {
        alert('Debe validar el captcha antes de continuar.');
      }

      
    // stop here if form is invalid
    if (this.formsignin.invalid) {
        return;
    }
    this.loading = true;
    this.authenticationService.recover(this.f.email.value, this.f.captcha.value)
        .pipe(first())
        .subscribe(
            data => {
                               document.getElementById('btnDatosIncorrectos').click();
               
               this.f.captcha.reset();
               this.loading = false;
            },
            error => {
              this.f.captcha.reset();
                this.loading = false;
            });
}

resolved(captchaResponse: string) {
  console.log(`Resolved response token: ${captchaResponse}`);
}

}
