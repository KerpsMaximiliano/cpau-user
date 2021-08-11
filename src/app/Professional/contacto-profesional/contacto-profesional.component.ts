import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { SiteLoader } from '@app/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacto-profesional',
  templateUrl: './contacto-profesional.component.html',
  styleUrls: ['./contacto-profesional.component.css']
})
export class ContactoProfesionalComponent implements OnInit {
  form: FormGroup;
  submitting: boolean;

  constructor(private formBuilder: FormBuilder,
    private siteLoader: SiteLoader,
    private _Activatedroute:ActivatedRoute,
    private el: ElementRef) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      mensaje: new FormControl('', [Validators.required]),
      guidProfesional: this._Activatedroute.snapshot.paramMap.get("guid"),
      captcha: new FormControl('', [Validators.required])
    });
  }

  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.form.get(key).errors;

    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {

          const control =this.el.nativeElement.querySelector(`#${key}`);
console.log(`#${key}`)
          if(control)
            control.focus();

            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
  }

  submit(){

    if (this.form.value.captcha == null || this.form.value.captcha.trim() == '') {
      alert('Debe validar el captcha antes de continuar.');
    }


    if (this.form.invalid) {
      this.getFormValidationErrors();
      return;
    }

    if(!this.form.value.correo.includes('@')){
      alert('El correo no es valido.');
      return;
    }

    let serializedForm = JSON.stringify(this.form.getRawValue());
    this.submitting = true;
    this.siteLoader.professionalContact(serializedForm)
    .subscribe(
        data => {
           if(data && data.success) {
            alert("Email enviado!");
           }
           this.submitting = false;
        },
        error => {
          this.submitting = false;
        });
    }


    resolved(captchaResponse: string) {
      console.log(`Resolved response token: ${captchaResponse}`);
    }
}
