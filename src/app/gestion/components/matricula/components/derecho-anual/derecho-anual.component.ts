import { Component, OnInit } from '@angular/core';
import { ColumnType } from '@app/shared/enum/ColumnType.enum';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { DerechoAnual } from './models/derecho-anual.model';
import { DerechoAnualService } from './services/derecho-anual.service';

@Component({
  selector: 'app-derecho-anual',
  templateUrl: './derecho-anual.component.html',
  styleUrls: ['./derecho-anual.component.css']
})
export class DerechoAnualComponent implements OnInit {

  mostrarPop: boolean;
  collapsed: boolean;
  public filas: Filas<DerechoAnual>[] = [];
  public columnas: Columna<DerechoAnual>[];
  public urlHelp = 'https://cpau.org/Content/institucional/%2F%2Fpreguntas-frecuentes%2Fherramientas-online';

  constructor(private derechoAnualService: DerechoAnualService) {
    this.columnas = [
      {
        id: 'periodo',
        titulo: 'Concepto'
      },
      {
        id: 'saldo',
        titulo: 'Monto',
        tipo: ColumnType.Currency
      }
    ];
  }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.filas = [];
    this.derechoAnualService.getAll()
    .subscribe(d => {
      d.map(x => {
        this.filas = [
          ...this.filas,
          {
            valor: x,
            campoSumarizador: 'saldo'
          }
        ];
      });
    });
  }

  onPagarDerechoAnual() {
    this.mostrarPop = true;
  }

  onGenerarBoletaPago() {
    // WS que genera el PDF de pago.
  }

  protected reload() {
    this.initData();
  }
}
