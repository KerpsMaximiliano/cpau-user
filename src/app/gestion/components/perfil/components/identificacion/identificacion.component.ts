import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { Observable } from 'rxjs';
import { IdentificacionService } from './service/identificacion.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentificacionComponent {

  collapsed: boolean;
  public identificacionForm: FormGroup;

  public countries$: Observable<SelectItem[]>;

  public docTypes$: Observable<SelectItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    private identificacionService: IdentificacionService) {

    this.identificacionForm = this.formBuilder.group({
      nombre: ['', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(2)],
        updateOn: 'blur'
      }],
      apellido: ['', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(2)],
        updateOn: 'blur'
      }],
      sexo: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      tipoDoc: [],
      nroDoc: ['', {
        validators: [Validators.required, Validators.max(99999999), Validators.min(1000000)],
        updateOn: 'blur'
      }],
      fechaNac: [],
      paisNac: []
    });

    this.countries$ = this.identificacionService.countries$;
    this.docTypes$ = this.identificacionService.docTypes$;
  }

  onClick() {
    this.identificacionForm.markAllAsTouched();
    console.log(this.identificacionForm);
  }
}
