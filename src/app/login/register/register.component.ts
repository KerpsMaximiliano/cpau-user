import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { ListConstantService, AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../stylesCustom/styles/form.css']
})
export class RegisterComponent implements OnInit {
  formregister: FormGroup;
  matriculaTipos = [];
  loading = false;
  docTipos = [];
  isCheckedmatriculado = true;
  disableRegisterButton = true;
  bMatriculaValidation = false;
  bUserNameValidaion = false;
  errorPass = true;

  constructor(private el: ElementRef, private formBuilder: FormBuilder, private listConstantService: ListConstantService, private router: Router, private authenticationService: AuthenticationService) {
  }

  getFormValidationErrors() {
    Object.keys(this.formregister.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.formregister.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {

          const control =this.el.nativeElement.querySelector(`#${key}`);

          if(control)
            control.focus();

            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }
 // convenience getter for easy access to form fields
 get f() { return this.formregister.controls; }

 ngDoCheck(){
    this.disableRegisterButton =this.formregister.invalid;

    if(this.f.txtPass1.value != this.f.txtPass2.value){
      this.errorPass = true;
      return;
    }
    else {
      this.errorPass = false;
    }
 }

  ngOnInit() {
    if(this.authenticationService.isAuthenticated()){
      this.router.navigate(['/']);
    }
    this.inicializarListas();
    this.formregister = this.formBuilder.group({
      cbTerminos: [false, Validators.requiredTrue],
      cbCpauEmail: [false, Validators.required],
      cbMatriculado: [true, Validators.required],
      txtNumeroMatricula: [{value:'', disabled:true}, Validators.required],
      txtNumeroDoc: [{value:'', disabled:true}, Validators.required],
      sltTipoMatricula: ['', Validators.required],
      sltTipoDoc: [{value:'', disabled:true}, Validators.required],

      txtNombre: ['', Validators.nullValidator],
      txtApellido: ['', Validators.nullValidator],
      txtEmail: ['', Validators.nullValidator],

      txtUser: ['', Validators.required],
      txtPass1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      txtPass2: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    this.loading =true;
    this.errorPass = false;
    // stop here if form is invalid
    if (this.formregister.invalid) {
      this.getFormValidationErrors();
        return;
    }

    if(this.f.txtPass1.value != this.f.txtPass2.value){
      return;
    }

    let formObj = this.formregister.getRawValue(); // {name: '', description: ''}

    let serializedForm = JSON.stringify(formObj);

    this.disableRegisterButton = true;
    this.authenticationService.register(serializedForm)
        .subscribe(
            data => {
               if(data && data.success) {
                   if(data.code && data.code === 1) {
                    document.getElementById('btnYaEstasRegistrado').click();
                   } else if(data.code && data.code === -1) {
                    document.getElementById('btnDatosIncorrectos').click();
                   }
                   else {
                    this.router.navigate(['/login']);
                   }
               } else {
                document.getElementById('btnDatosIncorrectos').click();
               }
               console.log(data);
               this.disableRegisterButton = false;
               this.loading =false;
            },
            error => {
              this.disableRegisterButton = false;
              this.loading =false;
            });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;

  }

  inicializarListas() {
    this.listConstantService
      .getMatriculaTipos()
      .subscribe(
        data => {
             if(data) {
                 if(data.success) {
                    this.matriculaTipos=data.matriculastipos;
                 }
             }
          }
      );

      this.listConstantService
      .getDocTipos()
      .subscribe(
        data => {
             if(data) {
                 if(data.success) {
                    this.docTipos=data.docTypes;
                 }
             }
          }
      );
  }

  onChangeTipoMatricula(event){
    this.f.sltTipoMatricula.setValue(event.target.value, {
        onlySelf: true
    })

    const blockNumMatricula = event.target.selectedIndex == 0;

    if(!blockNumMatricula){
      this.f.txtNumeroMatricula.enable();
      this.el.nativeElement.querySelector('#txtNumeroMatricula').focus()
    }
    else{
      this.f.txtNumeroMatricula.setValue('');
      this.f.txtNumeroMatricula.disable()
    }
  }

  checkMatricula(){
    this.listConstantService
    .checkMatricula(this.f.sltTipoMatricula.value, this.f.txtNumeroMatricula.value)
    .subscribe(
      data => {
          this.bMatriculaValidation = false;
           if(data) {
               if(data.success) {
                if(data.documentoTipoId !== 0)
                  this.f.sltTipoDoc.setValue(data.documentoTipoId);
                else {
                  this.f.sltTipoDoc.setValue('');
                  this.bMatriculaValidation = true;
                }
                this.f.txtNumeroDoc.enable();
               }
               else{
               }
           }

        },
        error => {

        }
    );
  }

  valMatricula() {
    if(this.f.cbMatriculado.value === true) {
      this.listConstantService
      .validMatricula(this.f.sltTipoMatricula.value, this.f.txtNumeroMatricula.value, this.f.sltTipoDoc.value, this.f.txtNumeroDoc.value)
      .subscribe(
        data => {
            if(data) {
                if(!data.result) {
                  this.f.txtNombre.setValue('');
                  this.f.txtApellido.setValue('');
                  this.f.txtEmail.setValue('');
                  if(data.error !== '')
                    alert(data.error);
                }
                else {
                  this.f.txtNombre.setValue(data.firstName);
                  this.f.txtApellido.setValue(data.lastName);
                  this.f.txtEmail.setValue(data.email);
                }
            }
          },
          error => {
          }
      );
    }
  }

  valUserName(event) {
    if(event.target.value !== ''){
      this.authenticationService.validUserName(event.target.value)
      .subscribe(
        data => {
          this.bUserNameValidaion=false;
          if(data && data.success) {
            this.f.txtUser.setValue('');
            this.bUserNameValidaion=true;
          }
        }
      );
    }
  }

  onChangeMatriculado (event) {
    this.isCheckedmatriculado = event.target.checked;

    this.f.txtNombre.setValue('');
    this.f.txtApellido.setValue('');
    this.f.txtEmail.setValue('');
    this.f.txtNumeroDoc.setValue('');

    if(!this.isCheckedmatriculado) {
      this.f.txtNombre.enable();
      this.f.txtApellido.enable();
      this.f.txtEmail.enable();
      this.f.txtNumeroMatricula.setValidators(null);
      this.f.sltTipoMatricula.setValidators(null);
      this.f.sltTipoDoc.setValidators([Validators.required]);
      this.f.sltTipoDoc.setValue('',{onlySelf: true});
      this.f.sltTipoDoc.enable();
      this.f.txtNumeroDoc.enable();
    } else {
      this.f.txtNombre.disable();
      this.f.txtApellido.disable();
      this.f.txtEmail.disable();
      this.f.sltTipoDoc.setValidators(null);
      this.f.txtNumeroMatricula.setValidators([Validators.required]);
      this.f.sltTipoMatricula.setValidators([Validators.required]);
      this.formregister.get('sltTipoMatricula').setValue('', {onlySelf: true});
      this.f.txtNumeroMatricula.setValue('');
      this.f.sltTipoDoc.disable();
      this.f.txtNumeroDoc.disable();
    }

    this.f.sltTipoMatricula.updateValueAndValidity();
    this.f.txtNumeroMatricula.updateValueAndValidity();
    this.f.sltTipoDoc.updateValueAndValidity();
  }
}
