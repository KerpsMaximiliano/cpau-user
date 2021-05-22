import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { equalsValidator } from '@app/shared/validators/equalsValidator';
import { ToastrService } from 'ngx-toastr';
import { Contrasenia } from './models/contrasenia.model';
import { ContraseniaService } from './service/contrasenia.service';

@Component({
  selector: 'app-contrasenia',
  templateUrl: './contrasenia.component.html',
  styleUrls: ['./contrasenia.component.css']
})
export class ContraseniaComponent implements OnInit {

  collapsed: boolean;
  loading: boolean;
  public contraseniaForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private contraseniaService: ContraseniaService) {
    this.contraseniaForm = this.formBuilder.group({
      passwordActual: ['', {
                validators: [Validators.required,
                            Validators.maxLength(50),
                            Validators.minLength(8)],
                updateOn: 'blur'
                }],
      nuevaPassword: ['', {
                validators: [Validators.required,
                            Validators.maxLength(50),
                            Validators.minLength(8)],
                updateOn: 'blur'
                }],
      repiteNuevaPassword: ['', {
                validators: [Validators.required,
                            Validators.maxLength(50),
                            Validators.minLength(8)],
                updateOn: 'blur'
                }],
    });

    this.contraseniaForm.get('repiteNuevaPassword').setValidators(
      equalsValidator(this.contraseniaForm.get('nuevaPassword'))
    );
  }

  ngOnInit() {
  }

  onSave(): void {
    if (this.contraseniaForm.valid) {
      this.loading = true;
      this.contraseniaForm.markAllAsTouched();
      const contraseniaToSave = this.contraseniaForm.value as Contrasenia;
  
      this.contraseniaService.update(contraseniaToSave).subscribe(response => {
        if (response.success) {
          this.contraseniaForm.reset();
          this.toastr.success('Actualizacion realizada con exito');
          this.loading = false;
        } else {
          this.toastr.error(response.message);
          this.loading = false;
        }
      });

    } else {
      this.contraseniaForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

}
