import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { Observable } from 'rxjs';
import { DomicilioService } from './service/domicilio.service';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  collapsed: boolean;
  public filas: Filas<Domicilio>[] = [];
  public columnnas: Columna<Domicilio>[];

  public tiposDomicilios$: Observable<SelectItem[]>;
  public domicilioForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private domicilioService: DomicilioService) {

    this.domicilioForm = this.formBuilder.group({
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
      }]
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
        id: 'deptoNro',
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

    this.tiposDomicilios$ = this.domicilioService.tiposDomicilios$;
  }

  ngOnInit() {
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
          id: 1,
          idTipoDomicilio: 1,
          tipoDomicilio: 'Particular',
          calle: 'Siempre Viva',
          altura: 333,
          piso: null,
          codigoPostal: '2000',
          deptoNro: null,
          localidad: 'Rosario'
        }
      }
    ];
  }

}

export interface Domicilio {
  id: number;
  tipoDomicilio: string;
  idTipoDomicilio: number;
  calle: string;
  altura: number;
  piso?: number;
  deptoNro?: string;
  localidad: string;
  codigoPostal: string;
}
