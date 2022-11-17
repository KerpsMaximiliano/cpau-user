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
  pass1requerida: boolean = false;
  pass1invalida: boolean = false;
  pass2requerida: boolean = false;
  pass2invalida: boolean = false;
  pass2nocoincide: boolean = false;
  

  constructor(  private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.activatedRoute.queryParams
    .subscribe(params => {
      this.token = params.token;
      this.email = params.email;
    });

    this.formsignin = this.formBuilder.group({
      pass1: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(50),Validators. pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!@$+%#_*&]{8,}$')]],
      pass2: ['', Validators.required]
  });
  }

 // convenience getter for easy access to form fields
 get f() { return this.formsignin.controls; }

  

  onSubmit() {

    this.pass1requerida = false;
    this.pass1invalida = false;
    this.pass2requerida = false;
    this.pass2invalida = false;
    this.pass2nocoincide = false;

    // stop here if form is invalid
    this.pass1requerida = this.formsignin.controls.pass1.value.trim().length === 0;
    if (!this.pass1requerida) {
      if (this.formsignin.controls.pass1.errors && this.formsignin.controls.pass1.errors.pattern) {
        this.pass1invalida = true;
      }
    }
    this.pass2requerida = this.formsignin.controls.pass2.value.trim().length === 0;

    if (this.pass1requerida || this.pass1invalida || this.pass2requerida) return;

    if(this.f.pass1.value != this.f.pass2.value) {
      this.pass2nocoincide = true;
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
                      this.router.navigate(['/login']);
                    }, 3000);
                   }
               }
            },
            error => {
                this.loading = false;
            });
}
}
