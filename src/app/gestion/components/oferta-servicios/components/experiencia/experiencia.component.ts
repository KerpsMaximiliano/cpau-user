import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'ng2-bootstrap-modal';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Experiencia } from './model/experiencia.model';
import { ExperienciaService } from './service/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  get f() { return this.experienciaForm.controls; }
  collapsed: boolean;
  public filas: Filas<Experiencia>[] = [];
  public columnnas: Columna<Experiencia>[];

  public tiposObras$: Observable<SelectItem[]>;
  public destinosObras$: Observable<SelectItem[]>;
  public experienciaForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private experienciaService: ExperienciaService,
    private toastr: ToastrService,
    private dialogService: DialogService) {

    this.experienciaForm = this.formBuilder.group({
      id: [],
      fechaInicio: ['', {
        // validators: [Validators.required],
        updateOn: 'blur'
      }],
      fechaFin: ['', {
        updateOn: 'blur'
      }],
      idTipo: ['', {
        validators: [Validators.required],
      }],
      ubicacion: ['', {
        validators: [Validators.maxLength(100), Validators.minLength(3)],
        updateOn: 'blur'
      }],
      idDestino: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
    });

    this.columnnas = [
      {
        id: 'fechaInicio',
        titulo: 'Fecha Inicio'
      },
      {
        id: 'fechaFin',
        titulo: 'Fecha Fin'
      },
      {
        id: 'ubicacion',
        titulo: 'Ubicación'
      },
    ];

    this.destinosObras$ = this.experienciaService.destinosObra$;
    this.tiposObras$ = this.experienciaService.tiposObra$;
  }

  ngOnInit() {
    this.experienciaService.getAll()
      .subscribe(d => {
        d.map(x => {
          this.filas = [
            ...this.filas,
            {
              valor: x
            }
          ];
        });
      });
  }

  onEditar(ev: Experiencia) {
    this.experienciaForm.patchValue(ev);

    const fechaInicioArr = ev.fechaInicio.split('/');

    const fechaInicio = {
      day: +fechaInicioArr[0],
      month: +fechaInicioArr[1],
      year: +fechaInicioArr[2]
    }
    this.experienciaForm.controls.fechaInicio.patchValue(fechaInicio)

    const fechaFinArr = ev.fechaFin.split('/');
    const fechaFin = {
      day: +fechaFinArr[0],
      month: +fechaFinArr[1],
      year: +fechaFinArr[2]
    }
    this.experienciaForm.controls.fechaFin.patchValue(fechaFin)
  }

  showConfirm(ev) {
    const disposable = this.dialogService.addDialog(ModalComponent, {
      title: 'Confirmar borrado',
      message: '¿Esta seguro que desea borrar el registro seleccionado?'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          this.experienciaService.delete(ev.id).subscribe(d => {
            if (d.success) {
              const index = this.filas.findIndex(f => f.valor.id === ev.id);
              this.filas.splice(index, 1);
              this.toastr.success(null, 'Registro eliminado correctamente.');
            } else {
              this.toastr.error(null, d.message);
            }
          });
        }
      });
    // We can close dialog calling disposable.unsubscribe();
    // If dialog was not closed manually close it by timeout
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }

  async onEliminar(ev) {
    this.showConfirm(ev);
  }

  public editarFila(): void {
    if (this.experienciaForm.valid) {

      let dayFin = this.experienciaForm.value.fechaFin.day >= 10 ? this.experienciaForm.value.fechaFin.day.toString() : '0' + this.experienciaForm.value.fechaFin.day;
      let monthFin = this.experienciaForm.value.fechaFin.month >= 10 ? this.experienciaForm.value.fechaFin.month : '0' + this.experienciaForm.value.fechaFin.month;
      let dayInicio = this.experienciaForm.value.fechaInicio.day >= 10 ? this.experienciaForm.value.fechaInicio.day.toString() : '0' + this.experienciaForm.value.fechaInicio.day;
      let monthInicio = this.experienciaForm.value.fechaInicio.month >= 10 ? this.experienciaForm.value.fechaInicio.month : '0' + this.experienciaForm.value.fechaInicio.month;

      const fila = {
        ...this.experienciaForm.value,
        fechaFin: this.experienciaForm.value.fechaFin.year.toString() + '-' + monthFin + '-' + dayFin,
        fechaInicio: this.experienciaForm.value.fechaInicio.year.toString() + '-' + monthInicio + '-' + dayInicio
      } as Experiencia;
      this.experienciaService.update(fila).subscribe(i => {
        if (i.success) {
          const index = this.filas.findIndex(f => f.valor.id === fila.id);
          this.filas[index].valor = fila;
          this.experienciaForm.reset();
          this.toastr.success(null, 'Registro editado correctamente.');
        } else {
          this.toastr.error(null, i.message);
        }
      });
    } else {
      this.experienciaForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  public agregarFila(): void {
    if (this.experienciaForm.valid) {

      let dayFin = this.experienciaForm.value.fechaFin.day >= 10 ? this.experienciaForm.value.fechaFin.day.toString() : '0' + this.experienciaForm.value.fechaFin.day;
      let monthFin = this.experienciaForm.value.fechaFin.month >= 10 ? this.experienciaForm.value.fechaFin.month : '0' + this.experienciaForm.value.fechaFin.month;
      let dayInicio = this.experienciaForm.value.fechaInicio.day >= 10 ? this.experienciaForm.value.fechaInicio.day.toString() : '0' + this.experienciaForm.value.fechaInicio.day;
      let monthInicio = this.experienciaForm.value.fechaInicio.month >= 10 ? this.experienciaForm.value.fechaInicio.month : '0' + this.experienciaForm.value.fechaInicio.month;

      const fila = {
        ...this.experienciaForm.value,
        fechaFin: this.experienciaForm.value.fechaFin.year.toString() + '-' + monthFin + '-' + dayFin,
        fechaInicio: this.experienciaForm.value.fechaInicio.year.toString() + '-' + monthInicio + '-' + dayInicio
      } as Experiencia;

      this.experienciaService.insert(fila).subscribe(i => {
        if (i.success) {
          this.filas = [
            ...this.filas,
            {
              valor: i.entity
            }
          ];
          this.experienciaForm.reset();

          this.toastr.success(null, 'Registro agregado correctamente.');
        } else {
          this.toastr.error(null, i.message);
        }
      });
    } else {
      this.experienciaForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }
}
