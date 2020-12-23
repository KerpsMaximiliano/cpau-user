import { Component, OnInit } from '@angular/core';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { Resumen, ResumenGrid } from './models/resumen.model';
import { ResumenService } from './service/resumen.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  collapsed: boolean;
  public filas: Filas<ResumenGrid>[] = [];
  public columnas: Columna<ResumenGrid>[];
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
    this.filas = [];
    this.resumenService.getAll()
      .subscribe(d => {
        Object.keys(d).forEach(k => {
          this.filas.push(
            {valor: {id: k ,
                     valor: d[k],
                     titulo: k.replace(/([A-Z])/g, ' $1')
                              .replace(/^./, function(str){ return str.toUpperCase(); })}})
        });
    });
  }
}

