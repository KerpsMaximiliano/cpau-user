import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '@app/gestion/shared/validators/CustomValidator';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Columna, Filas } from '@app/shared/models/ActionTable';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Curso } from './model/curso.model';
import { CursoService } from './service/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {

  get f() { return this.cursosForm.controls; }
  collapsed: boolean;
  loading: boolean;
  public filas: Filas<Curso>[] = [];
  public columnnas: Columna<Curso>[];
  public urlHelp = 'https://www.cpau.org/nota/34669';

  public cursosForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private toastr: ToastrService,
    private dialogService: DialogService) {
    this.cursosForm = this.formBuilder.group({
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
      institucion: [null, {
        validators: [Validators.maxLength(100), Validators.minLength(2), Validators.required, CustomValidator.noWhitespaceValidator],
        updateOn: 'blur'
      }],
    });

    this.columnnas = [
      {
        id: 'institucion',
        titulo: 'Institución'
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
  }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.filas = [];
    this.cursoService.getAll()
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

  onEditar(ev: Curso) {

    this.loading = true;

    this.cursosForm.patchValue(ev);
    const fechaInicioArr = ev.fechaInicio.split('/');
    const fechaInicio = {
      day: +fechaInicioArr[0],
      month: +fechaInicioArr[1],
      year: +fechaInicioArr[2]
    }

    this.cursosForm.controls.fechaInicio.patchValue(fechaInicio)
    if (ev.fechaFin) {

      const fechaFinArr = ev.fechaFin.split('/');
      const fechaFin = {
        day: +fechaFinArr[0],
        month: +fechaFinArr[1],
        year: +fechaFinArr[2]
      }
      this.cursosForm.controls.fechaFin.patchValue(fechaFin);
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
          this.cursoService.delete(ev.id).subscribe(d => {
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
    if (this.cursosForm.valid) {
      var fechaFin;
      var fechaInicio;
      if (this.cursosForm.value.fechaFin) {
        let dayFin = this.cursosForm.value.fechaFin.day >= 10 ? this.cursosForm.value.fechaFin.day.toString() : '0' + this.cursosForm.value.fechaFin.day;
        let monthFin = this.cursosForm.value.fechaFin.month >= 10 ? this.cursosForm.value.fechaFin.month : '0' + this.cursosForm.value.fechaFin.month;
        fechaFin = this.cursosForm.value.fechaFin.year.toString() + '-' + monthFin + '-' + dayFin;
      }

      let dayInicio = this.cursosForm.value.fechaInicio.day >= 10 ? this.cursosForm.value.fechaInicio.day.toString() : '0' + this.cursosForm.value.fechaInicio.day;
      let monthInicio = this.cursosForm.value.fechaInicio.month >= 10 ? this.cursosForm.value.fechaInicio.month : '0' + this.cursosForm.value.fechaInicio.month;
      fechaInicio = this.cursosForm.value.fechaInicio.year.toString() + '-' + monthInicio + '-' + dayInicio;

      this.loading = true;
      const fila = {
        ...this.cursosForm.value,
        fechaFin: fechaFin,
        fechaInicio: fechaInicio
      } as Curso;
      this.cursoService.update(fila).subscribe(i => {
        if (i.success) {
          const index = this.filas.findIndex(f => f.valor.id === fila.id);
          this.filas[index].valor = i.entity;
          this.cursosForm.reset();
          this.toastr.success(null, 'Registro editado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, i.message);
          this.loading = false;
        }
      });
    } else {
      this.cursosForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  public agregarFila(): void {
    if (this.cursosForm.valid) {
      var fechaFin;
      var fechaInicio;
      if (this.cursosForm.value.fechaFin) {
        let dayFin = this.cursosForm.value.fechaFin.day >= 10 ? this.cursosForm.value.fechaFin.day.toString() : '0' + this.cursosForm.value.fechaFin.day;
        let monthFin = this.cursosForm.value.fechaFin.month >= 10 ? this.cursosForm.value.fechaFin.month : '0' + this.cursosForm.value.fechaFin.month;
        fechaFin = this.cursosForm.value.fechaFin.year.toString() + '-' + monthFin + '-' + dayFin;
      }
      let dayInicio = this.cursosForm.value.fechaInicio.day >= 10 ? this.cursosForm.value.fechaInicio.day.toString() : '0' + this.cursosForm.value.fechaInicio.day;
      let monthInicio = this.cursosForm.value.fechaInicio.month >= 10 ? this.cursosForm.value.fechaInicio.month : '0' + this.cursosForm.value.fechaInicio.month;
      fechaInicio = this.cursosForm.value.fechaInicio.year.toString() + '-' + monthInicio + '-' + dayInicio;

      const fila = {
        ...this.cursosForm.value,
        fechaFin: fechaFin,
        fechaInicio: fechaInicio
      } as Curso;
      this.cursoService.insert(fila).subscribe(i => {
        if (i.success) {
          this.filas = [
            ...this.filas,
            {
              valor: i.entity
            }
          ];
          this.cursosForm.reset();

          this.toastr.success(null, 'Registro agregado correctamente.');
        } else {
          this.toastr.error(null, i.message);
        }
      });
    } else {
      this.cursosForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }
  public cancelarFila(): void {
    this.cursosForm.reset();
  }
}
