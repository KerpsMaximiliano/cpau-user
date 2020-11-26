import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { Observable } from 'rxjs';
import { IdentificacionService } from './service/identificacion.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentificacionComponent implements OnInit {


  public filas: Filas<Contacto>[] = [];
  public columnnas: Columna<Contacto>[];
  public identificacionForm: FormGroup;

  public countries$: Observable<SelectItem[]>;

  public docTypes$: Observable<SelectItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    private identificacionService: IdentificacionService) {


    this.columnnas = [
      {
        id: 'nombre',
        titulo: 'Nombre'
      },
      {
        id: 'apellido',
        titulo: 'Apellido'
      }
    ];

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

  ngOnInit() {

    this.filas = [
      {
        valor: {
          apellido: 'Rossi',
          id: 0,
          nombre: 'Alexis'
        }
      },
      {
        valor: {
          apellido: 'Villalba',
          id: 10,
          nombre: 'Omar'
        }
      }
    ]
  }

  onClick() {
    this.identificacionForm.markAllAsTouched();
    console.log(this.identificacionForm);
  }

  onEditar(ev) {
    console.log(ev);
  }

  onEliminar(ev) {
    console.log(ev);
  }

  onVisualizar(ev) {
    console.log(ev);
  }

  public agregarFila(): void {
    this.filas = [
      ...this.filas,
      {
        valor: {
          apellido: 'fila',
          id: 11,
          nombre: 'nueva'
        }
      }
    ]
  }
}


export interface Contacto {
  id: number;
  nombre: string;
  apellido: string;
}
