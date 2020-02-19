import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { SiteLoader } from '@app/_services';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  form: FormGroup;
  submitting: boolean;

  constructor(private formBuilder: FormBuilder,
    private siteLoader: SiteLoader,
    private el: ElementRef) { }

    ngOnInit() {
      this.form = this.formBuilder.group({
        nombre: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required]),
        matricula: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required]),
        celular: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required]),
        tipoConsulta: 'consulta',
        comentario: new FormControl('', [Validators.required]),
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

    onChangeTypeContact(value){
      this.form.value.tipoConsulta = value;
    }

    submit(){
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
      this.siteLoader.generaContact(serializedForm)
      .subscribe(
          data => {
             if(data && data.success) {

             }
             this.submitting = false;
          },
          error => {
            this.submitting = false;
          });
      }
}
