import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { CustomValidator } from '@app/gestion/shared/validators/CustomValidator';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Posgrado } from './model/posgrado.model';
import { PosgradoService } from './service/posgrado.service';

@Component({
  selector: 'app-posgrados',
  templateUrl: './posgrados.component.html',
  styleUrls: ['./posgrados.component.css']
})
export class PosgradosComponent implements OnInit {

  get f() { return this.posgradoForm.controls; }
  collapsed: boolean;
  loading: boolean;
  public filas: Filas<Posgrado>[] = [];
  public columnnas: Columna<Posgrado>[];
  public universidades$: Observable<SelectItem[]>;
  public urlHelp = 'https://www.cpau.org/nota/34670';

  public posgradoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private posgradoService: PosgradoService,
    private toastr: ToastrService,
    private dialogService: DialogService) {
    this.posgradoForm = this.formBuilder.group({
      id: [],
      fechaInicio: [null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      fechaFin: [null, {
        updateOn: 'blur'
      }],
      nombre: [null, {
        validators: [Validators.maxLength(100), Validators.minLength(3), Validators.required, CustomValidator.noWhitespaceValidator],
        updateOn: 'blur'
      }],
      idUniversidad: [null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
    });

    this.columnnas = [
      {
        id: 'universidad',
        titulo: 'Universidad'
      },
      {
        id: 'nombre',
        titulo: 'Nombre'
      },
      {
        id: 'fechaInicio',
        titulo: 'Fecha inicio'
      },
      {
        id: 'fechaFin',
        titulo: 'Fecha fin'
      },
    ];

    this.universidades$ = this.posgradoService.universidades$;
  }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.filas = [];
    this.posgradoService.getAll()
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
  reload() {
    this.initData();
  }

  onEditar(ev: Posgrado) {
    this.loading = true;
    this.posgradoForm.patchValue(ev);
    const fechaInicioArr = ev.fechaInicio.split('/');
    const fechaInicio = {
      year: +fechaInicioArr[2],
      month: +fechaInicioArr[1],
      day: +fechaInicioArr[0].slice(0, 2)
    }

    this.posgradoForm.controls.fechaInicio.patchValue(fechaInicio)

    if (ev.fechaFin) {

      const fechaFinArr = ev.fechaFin.split('/');
      const fechaFin = {
        year: +fechaInicioArr[2],
        month: +fechaInicioArr[1],
        day: +fechaInicioArr[0].slice(0, 2)
      }
      this.posgradoForm.controls.fechaFin.patchValue(fechaFin);
    }
    this.loading = false;

  }

  showConfirm(ev) {
    const disposable = this.dialogService.addDialog(ModalComponent, {
      title: 'Confirmar borrado',
      message: '¿Esta seguro que desea borrar el registro seleccionado?'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          this.posgradoService.delete(ev.id).subscribe(d => {
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
    if (this.posgradoForm.valid) {
      var fechaFin;
      var fechaInicio;
      if (this.posgradoForm.value.fechaFin) {
        let dayFin = this.posgradoForm.value.fechaFin.day >= 10 ? this.posgradoForm.value.fechaFin.day.toString() : '0' + this.posgradoForm.value.fechaFin.day;
        let monthFin = this.posgradoForm.value.fechaFin.month >= 10 ? this.posgradoForm.value.fechaFin.month : '0' + this.posgradoForm.value.fechaFin.month;
        fechaFin = this.posgradoForm.value.fechaFin.year.toString() + '-' + monthFin + '-' + dayFin;
      }
      let dayInicio = this.posgradoForm.value.fechaInicio.day >= 10 ? this.posgradoForm.value.fechaInicio.day.toString() : '0' + this.posgradoForm.value.fechaInicio.day;
      let monthInicio = this.posgradoForm.value.fechaInicio.month >= 10 ? this.posgradoForm.value.fechaInicio.month : '0' + this.posgradoForm.value.fechaInicio.month;
      fechaInicio = this.posgradoForm.value.fechaInicio.year.toString() + '-' + monthInicio + '-' + dayInicio;

      this.loading = true;
      const fila = {
        ...this.posgradoForm.value,
        fechaFin: fechaFin,
        fechaInicio: fechaInicio
      } as Posgrado;
      this.posgradoService.update(fila).subscribe(i => {
        if (i.success) {
          const index = this.filas.findIndex(f => f.valor.id === fila.id);
          this.filas[index].valor = i.entity;
          this.posgradoForm.reset();
          this.toastr.success(null, 'Registro editado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, i.message);
          this.loading = false;
        }
      });
    } else {
      this.posgradoForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  public agregarFila(): void {
    if (this.posgradoForm.valid) {
      var fechaFin;
      var fechaInicio;
      if (this.posgradoForm.value.fechaFin) {
        let dayFin = this.posgradoForm.value.fechaFin.day >= 10 ? this.posgradoForm.value.fechaFin.day.toString() : '0' + this.posgradoForm.value.fechaFin.day;
        let monthFin = this.posgradoForm.value.fechaFin.month >= 10 ? this.posgradoForm.value.fechaFin.month : '0' + this.posgradoForm.value.fechaFin.month;
        fechaFin = this.posgradoForm.value.fechaFin.year.toString() + '-' + monthFin + '-' + dayFin;
      }
      let dayInicio = this.posgradoForm.value.fechaInicio.day >= 10 ? this.posgradoForm.value.fechaInicio.day.toString() : '0' + this.posgradoForm.value.fechaInicio.day;
      let monthInicio = this.posgradoForm.value.fechaInicio.month >= 10 ? this.posgradoForm.value.fechaInicio.month : '0' + this.posgradoForm.value.fechaInicio.month;
      fechaInicio = this.posgradoForm.value.fechaInicio.year.toString() + '-' + monthInicio + '-' + dayInicio;

      const fila = {
        ...this.posgradoForm.value,
        fechaFin: fechaFin,
        fechaInicio: fechaInicio
      } as Posgrado;
      this.posgradoService.insert(fila).subscribe(i => {
        if (i.success) {
          this.filas = [
            ...this.filas,
            {
              valor: i.entity
            }
          ];
          this.posgradoForm.reset();

          this.toastr.success(null, 'Registro agregado correctamente.');
        } else {
          this.toastr.error(null, i.message);
        }
      });
    } else {
      this.posgradoForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }
  public cancelarFila(): void {
    this.posgradoForm.reset();
  }
}
