import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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

  mostrarPop: boolean = false;
  collapsed: boolean;
  puedePagar: boolean = false;
  bonificada: boolean = false;
  existeDeuda: boolean = true;
  pendienteActivacion: boolean = false;
  matricId: string;
  mostrarBotonRecibo: boolean = false;
  suspendido: boolean = false;
  vitalicio: boolean = false;
  mostrarDeuda: boolean = true;
  loaded: boolean = false;
  vitalicioBenefactor: boolean = false;

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
      this.suspendido = d.estadoMatricula == '7SP' || d.estadoMatricula == 'GSD';
      this.vitalicio = d.estadoMatricula == '8VI';
      this.puedePagar = d.puedePagar;
      this.bonificada = d.matriculaBonificada;
      this.mostrarDeuda = !this.vitalicio;
      this.pendienteActivacion = d.pendienteActivacion;
      this.existeDeuda = d.detalle.length > 0;
      this.vitalicioBenefactor = d.estadoMatricula == '9VB';
      d.detalle.map(x => {
        this.filas = [
          ...this.filas,
          {
            valor: x,
            campoSumarizador: 'saldo'
          }
        ];
      });
      this.derechoAnualService.hasRecibo().subscribe(a=> {this.mostrarBotonRecibo = a; this.loaded = true;});
    });
    
  }

  onPagarDerechoAnual() {
    this.mostrarPop = true;
  }

  onMostrarDeuda() {
    this.mostrarDeuda = true;
  }

  onActivarMatricula() {
    this.derechoAnualService.activarMatricula().subscribe();
    this.pendienteActivacion = true;
  }

  onGenerarBoletaPago() {
    // WS que genera el PDF de pago.
    this.derechoAnualService.imprimirRecibo();
  }

  getVitalicio() {
    return this.vitalicio;
  }


  

  reload() {
    this.initData();
  }
}
