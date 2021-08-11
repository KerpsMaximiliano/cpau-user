import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { SiteLoader } from '@app/_services';

@Component({
  selector: 'app-contacto-anunciante',
  templateUrl: './contacto-anunciante.component.html',
  styleUrls: ['./contacto-anunciante.component.css']
})
export class ContactoAnuncianteComponent implements OnInit {
  form: FormGroup;
  submitting: boolean;

  constructor(private formBuilder: FormBuilder,
    private siteLoader: SiteLoader,
    private el: ElementRef) { }

    ngOnInit() {
      this.form = this.formBuilder.group({
        nombre: new FormControl('', [Validators.required]),
        empresa: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required]),
        comentario: new FormControl('', [Validators.required]),
        captcha: new FormControl('', [Validators.required])
      });
    }

    getFormValidationErrors() {
      Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;

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

    validateEmail(mail) {
      return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
    }

    submit(){
      let errores:string[] = [];
      
      /*if (this.form.invalid) {
        this.getFormValidationErrors();
        return;
      }*/

      if (this.form.value.nombre.trim() == '') {
        errores.push("El nombre es requerido.");
      }

      if (this.form.value.correo.trim() == '') {
        errores.push("El correo electrónico es requerido.");
      } else if(this.form.value.correo.trim() != '' && !this.validateEmail(this.form.value.correo)) {
          errores.push('El correo electrónico no es válido.');
      }

      if (this.form.value.telefono.trim() == '') {
        errores.push("El teléfono es requerido.");
      } else if(this.form.value.telefono.trim() != '' && isNaN(this.form.value.telefono)){
          errores.push('El teléfono no es válido. Deben ser sólo números.');
      }

      if (this.form.value.captcha == null || this.form.value.captcha.trim() == '') {
        errores.push('Debe validar el captcha antes de continuar.');
      }

      if (errores.length > 0) {
        alert(errores.join("\n"));
        return;
      }

      let serializedForm = JSON.stringify(this.form.getRawValue());
      this.submitting = true;
      this.siteLoader.generaContactAnunciante(serializedForm)
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
