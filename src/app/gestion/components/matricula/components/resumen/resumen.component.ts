import { Component, OnInit } from '@angular/core';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { Resumen } from './models/resumen.model';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  collapsed: boolean;
  public filas: Filas<Resumen>[] = [];
  public columnas: Columna<Resumen>[];
  constructor() {
    this.columnas = [
      {
        id: 'titulo',
        titulo: ''
      },
      {
        id: 'valor',
        titulo: ''
      }
    ];
  }

  ngOnInit() {
    this.filas = [
      ...this.filas,
      {
        valor: {
          ... {
            id: 1,
            titulo: 'Tipo de matrícula:',
            valor: 'Registro decreto 0000/11'
          },
        }
      },
      {
        valor: {
          ... {
            id: 2,
            titulo: 'Número de matrícula:',
            valor: '800051'
          },
        }
      },
      {
        valor: {
          ... {
            id: 3,
            titulo: 'Fecha de matriculación:',
            valor: '01/12/2020'
          },
        }
      },
      {
        valor: {
          ... {
            id: 4,
            titulo: 'Estado:',
            valor: 'ACTIVO'
          },
        }
      },
      {
        valor: {
          ... {
            id: 5,
            titulo: 'Universidad:',
            valor: ''
          },
        }
      },
      {
        valor: {
          ... {
            id: 6,
            titulo: 'Fecha de egreso:',
            valor: '31/12/2020'
          },
        }
      }
    ];
  }
}

