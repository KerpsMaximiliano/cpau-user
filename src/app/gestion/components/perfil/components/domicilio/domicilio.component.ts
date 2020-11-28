import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Domicilio } from './model/domicilio.model';
import { DomicilioService } from './service/domicilio.service';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  get f() { return this.domicilioForm.controls; }

  collapsed: boolean;
  public filas: Filas<Domicilio>[] = [];
  public columnnas: Columna<Domicilio>[];

  public tiposDomicilios: SelectItem[];
  public domicilioForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private domicilioService: DomicilioService,
              private toastr: ToastrService) {

    this.domicilioForm = this.formBuilder.group({
      id: [],
      calle: ['', {
        validators: [Validators.required, Validators.maxLength(100), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      altura: ['', {
        validators: [Validators.required, Validators.maxLength(7), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      idTipoDomicilio: ['', {
        validators: [Validators.required],
      }],
      piso: ['', {
        validators: [Validators.maxLength(2), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      depto: ['', {
        validators: [Validators.maxLength(20), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      localidad: ['', {
        validators: [Validators.required, Validators.maxLength(100), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      codigoPostal: ['', {
        validators: [Validators.required, Validators.maxLength(7), Validators.minLength(4)],
        updateOn: 'blur'
      }], // TODO OMV AGREGAR EXPR
    });

    this.columnnas = [
      {
        id: 'tipoDomicilio',
        titulo: 'Tipo de domicilio'
      },
      {
        id: 'calle',
        titulo: 'Calle'
      },
      {
        id: 'altura',
        titulo: 'Altura'
      },
      {
        id: 'piso',
        titulo: 'Piso'
      },
      {
        id: 'depto',
        titulo: 'Depto Nro'
      },
      {
        id: 'localidad',
        titulo: 'Localidad'
      },
      {
        id: 'codigoPostal',
        titulo: 'Código Postal'
      }
    ];

    this.domicilioService.tiposDomicilios$.subscribe(s => this.tiposDomicilios = s);
  }

  ngOnInit() {
    this.domicilioService.getAll()
    .subscribe(d => {
      d.map(x => {
        this.filas = [
          ...this.filas,
          {
            valor: new Domicilio(x, this.tiposDomicilios)
          }
        ];
      });
    });
  }

  onEditar(ev) {
    this.domicilioForm.patchValue(ev);
  }

  onEliminar(ev) {
    // TODO OMV AGREGAR POP CONFIRM
    this.domicilioService.delete(ev.id).subscribe(d => {
        if (d.success) {
          const index = this.filas.findIndex(f => f.valor.id === ev.id);
          this.filas.splice(index, 1);
          this.toastr.success(null, 'Registro eliminado correctamente.');
        } else {
          this.toastr.error(null, d.message);
        }
    });
  }

  public editarFila(): void {
    if (this.domicilioForm.valid) {
      const fila = new Domicilio(this.domicilioForm.value, this.tiposDomicilios);

      this.domicilioService.update(fila).subscribe(i => {
        if (i.success) {
          const index = this.filas.findIndex(f => f.valor.id === fila.id);
          this.filas[index].valor = fila;
          this.domicilioForm.reset();
          this.toastr.success(null, 'Registro editado correctamente.');
        } else {
          this.toastr.error(null, i.message);
        }
      });
    } else {
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  public agregarFila(): void {
    if (this.domicilioForm.valid) {
      const fila = new Domicilio(this.domicilioForm.value, this.tiposDomicilios);

      this.domicilioService.insert(fila).subscribe(i => {
        if (i.success) {
          this.filas = [
            ...this.filas,
            {
              valor: fila
            }
          ];
          this.domicilioForm.reset();

          this.toastr.success(null, 'Registro agregado correctamente.');
        } else {
          this.toastr.error(null, i.message);
        }
      });
    } else {
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }
}
