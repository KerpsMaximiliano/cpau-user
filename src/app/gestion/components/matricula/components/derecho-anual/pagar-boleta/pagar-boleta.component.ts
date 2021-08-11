import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthenticationService } from "@app/_services";
import { DerechoAnualService } from '../services/derecho-anual.service';
import { ValidarPago } from '../models/validar-pago.model';

@Component({
  selector: 'app-pagar-boleta',
  templateUrl: './pagar-boleta.component.html',
  styleUrls: ['./pagar-boleta.component.css']
})
export class PagarBoletaComponent implements OnInit {

  isProcessing: boolean;
  cuotas: string = '3';
  formValidarPago: ValidarPago;
  debito: boolean = false;
  @ViewChild('form', { static: false }) form: ElementRef;
  @Output() cerrar = new EventEmitter();
  constructor(private derechoAnualService: DerechoAnualService) { }

  ngOnInit() {
  }

  select(medioDePago: string) {
    this.derechoAnualService.pagarBoleta(medioDePago, this.cuotas).subscribe(data => {
      this.formValidarPago = {
        cuotas: data.cuotas,
        emailCliente: data.emailCliente,
        nroComercio: data.nroComercio,
        nroOperacion: data.nroOperacion,
        medioDePago: data.medioDePago,
        monto: `${data.monto}00`
      }
      this.form.nativeElement.submit();
    })
  }

}
