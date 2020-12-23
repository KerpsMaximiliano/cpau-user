import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { CustomValidator } from '@app/gestion/shared/validators/CustomValidator';
import { FieldErrorsMessages } from '@app/shared/components/form-error/form-error.component';
import { NgbDate, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
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
  };

  model1: any;
  config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
    drops: 'up',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    format: 'DD/MM/YYYY',
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    meridiemFormat: 'A',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: true,
    locale: 'es-AR',

  } as IDatePickerDirectiveConfig;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dateAdapter: NgbDateAdapter<string>,
    private identificacionService: IdentificacionService) {

    this.identificacionForm = this.formBuilder.group({
      nombres: ['', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(2), CustomValidator.noWhitespaceValidator],
        updateOn: 'blur'
      }],
      apellidos: ['', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(2), CustomValidator.noWhitespaceValidator],
        updateOn: 'blur'
      }],
      sexo: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      tipoDocumento: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      numeroDocumento: ['', {
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(8)],
        updateOn: 'blur'
      }],
      nacimiento: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      pais: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }]
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
  onDateSelect(event) {
    console.log('el evento', event);

  }
  public onSave(): void {
    this.identificacionForm.markAllAsTouched();
    const identifToSave = this.identificacionForm.value as Identificacion;

    this.identificacionService.update(identifToSave).subscribe(response => {
      if (response.success) {
        this.identificacionService.currentIdentificacionValue = response.entity;
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
