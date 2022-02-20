import { Component, OnInit } from '@angular/core';
import { ColumnType } from '@app/shared/enum/ColumnType.enum';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { DetalleDeuda } from './models/detalle-deuda.model';
import { DerechoAnualService } from './services/derecho-anual.service';

@Component({
  selector: 'app-derecho-anual',
  templateUrl: './derecho-anual.component.html',
  styleUrls: ['./derecho-anual.component.css']
})
export class DerechoAnualComponent implements OnInit {

  mostrarPop: boolean;
  collapsed: boolean;
  puedePagar: boolean = false;
  bonificada: boolean = false;
  existeDeuda: boolean = true;
  pendienteActivacion: boolean = false;
  matricId: string;

  public filas: Filas<DetalleDeuda>[] = [];
  public columnas: Columna<DetalleDeuda>[];
  public urlHelp = 'https://www.cpau.org/nota/34665';

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
      this.matricId = d.matricId;
      this.puedePagar = d.puedePagar,
      this.bonificada = d.matriculaBonificada,
      this.pendienteActivacion = d.pendienteActivacion,
      this.existeDeuda = d.detalle.length > 0;
      d.detalle.map(x => {
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

  onActivarMatricula() {
    this.derechoAnualService.activarMatricula().subscribe();
    this.pendienteActivacion = true;
  }

  onGenerarBoletaPago() {
    // WS que genera el PDF de pago.
  }

  imprimirBoleta() {
    this.derechoAnualService.imprimirBoleta(this.matricId);
  }

  protected reload() {
    this.initData();
  }
}
