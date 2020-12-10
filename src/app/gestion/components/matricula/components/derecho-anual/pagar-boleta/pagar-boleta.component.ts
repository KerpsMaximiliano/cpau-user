import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pagar-boleta',
  templateUrl: './pagar-boleta.component.html',
  styleUrls: ['./pagar-boleta.component.css']
})
export class PagarBoletaComponent implements OnInit {

  isProcessing: boolean;
  cuotas: string;
  formValidarPago: ValidarPago;
  @ViewChild('form', {static: true}) form: ElementRef;
  @Output() cerrar = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  select(medioDePago: string) {
    console.log('Pagar');

    // $http.post(
    //     '/api/consejo/pagarboleta',
    //     {
    //         matriculadoId: session.matriculado.id,
    //         creditCardType: medioDePago,
    //         creditCardInstallments: this.cuotas
    //     }
    // ).then(response => {
        // this.formValidarPago.cuotas = this.cuotas;
        // this.formValidarPago.emailCliente = response.data.emailCliente;
        // this.formValidarPago.nroComercio = response.data.nroComercio;
        // this.formValidarPago.nroOperacion = response.data.nroOperacion;
        // this.formValidarPago.medioDePago = medioDePago;
        // this.formValidarPago.monto = `${response.data.monto}00`;
        // this.form.nativeElement.submit();
    // });
  }

}

export class ValidarPago {
  nroComercio: string;
  nroOperacion: string;
  medioDePago: string;
  monto: string;
  cuotas: string;
  emailCliente: string;
}
