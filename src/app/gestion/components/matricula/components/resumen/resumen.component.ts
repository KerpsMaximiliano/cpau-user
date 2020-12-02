import { Component, OnInit } from '@angular/core';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { Resumen } from './models/resumen.model';
import { ResumenService } from './service/resumen.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  collapsed: boolean;
  public filas: Filas<Resumen>[] = [];
  public columnas: Columna<Resumen>[];
  constructor(private resumenService: ResumenService) {
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
    this.resumenService.getAll()
      .subscribe(d => {
        d.map(x => {
          this.filas = [
            ...this.filas,
            {
              valor: x,
            }
          ];
        });
    });
  }
}

