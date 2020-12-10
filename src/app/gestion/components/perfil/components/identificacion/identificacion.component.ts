import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { FieldErrorsMessages } from '@app/shared/components/form-error/form-error.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Identificacion } from './model/identificacion.model';
import { IdentificacionService } from './service/identificacion.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentificacionComponent implements OnInit {

  private identificacionOriginal: Identificacion;
  collapsed: boolean;
  public identificacionForm: FormGroup;

  public countries$: Observable<SelectItem[]>;
  public docTypes$: Observable<SelectItem[]>;
  public fieldErrors: FieldErrorsMessages = {
    required: 'Campo Requerido',
    minlength: 'La longitud debe ser mayor a 2 caracteres',
    maxlength: 'La longitud debe ser menor a 200 caracteres'
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private identificacionService: IdentificacionService) {

    this.identificacionForm = this.formBuilder.group({
      nombres: ['', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(2)],
        updateOn: 'blur'
      }],
      apellidos: ['', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(2)],
        updateOn: 'blur'
      }],
      sexo: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      tipoDocumento: [],
      numeroDocumento: ['', {
        validators: [Validators.required, Validators.max(99999999), Validators.min(1000000)],
        updateOn: 'blur'
      }],
      nacimiento: [],
      pais: []
    });

    this.countries$ = this.identificacionService.countries$;
    this.docTypes$ = this.identificacionService.docTypes$;
  }

  public ngOnInit(): void {
    this.identificacionService.read().subscribe(identificacion => {
      this.identificacionForm.patchValue(identificacion);
      this.identificacionOriginal = identificacion;
    });
  }

  public onSave(): void {
    this.identificacionForm.markAllAsTouched();
    const identifToSave = this.identificacionForm.value as Identificacion;

    this.identificacionService.update(identifToSave).subscribe(response => {
      if (response.success) {
        this.toastr.success('Actualizacion realizada con exito')
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  public onCancel(): void {
    this.identificacionForm.patchValue(this.identificacionOriginal);
    this.identificacionForm.markAsPristine();
  }
}
