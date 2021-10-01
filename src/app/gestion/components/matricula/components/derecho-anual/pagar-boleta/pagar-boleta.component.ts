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
  @ViewChild('emailCliente', { static: false }) email : ElementRef;
  @Output() cerrar = new EventEmitter();
  constructor(private derechoAnualService: DerechoAnualService) { }

  ngOnInit() {
  }

  select(medioDePago: string) {
    this.derechoAnualService.pagarBoleta(medioDePago, this.cuotas)
    .subscribe(data => {
      this.buildForm(data);
    })
  }
  buildForm(data: ValidarPago) {
    
    var my_form=document.createElement('FORM') as any;
    my_form.method='POST';
    my_form.action='https://sps.decidir.com/sps-ar/Validar';

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='CUOTAS';
    my_tb.value=data.cuotas;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='NROCOMERCIO';
    my_tb.value=data.nroComercio;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='NROOPERACION';
    my_tb.value=data.nroOperacion;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='MEDIODEPAGO';
    my_tb.value=data.medioDePago;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='MONTO';
    my_tb.value=`${data.monto}00`;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='EMAILCLIENTE';
    my_tb.value=data.emailCliente;
    my_form.appendChild(my_tb);
    
    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='URLDINAMICA';
    my_tb.value='https://www.cpau.org/api/consejo/resultadooperacion';
    my_form.appendChild(my_tb);

    document.body.appendChild(my_form);
    my_form.submit();
  }

}
