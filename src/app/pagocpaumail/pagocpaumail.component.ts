import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidarPago } from '@app/gestion/components/matricula/components/derecho-anual/models/validar-pago.model';
import { SiteLoader } from '@app/_services';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-pagocpaumail',
  templateUrl: './pagocpaumail.component.html',
  styleUrls: ['./pagocpaumail.component.css']
})
export class PagoCpauMailComponent implements OnInit {
  data: any;
  guid: string;
  archivo: boolean;
  imgSrc: string | ArrayBuffer = "stylesCustom/images/fas-fa-user-circle.svg";
  website: string;

  nombre: string;
  tipoMatricula: string;
  matricula: string;
  monto: string;
  matricId: string;
  email: string;

  cuotas: string;
  tipotarjeta: string;
  formValidarPago: ValidarPago;

  constructor(private _Activatedroute:ActivatedRoute, 
    private siteLoader: SiteLoader) { }

  ngOnInit() {
    this.guid = this._Activatedroute.snapshot.paramMap.get("guid");
    this.siteLoader.getDatosPago(this.guid).subscribe( data =>{
      this.data = data;
      this.nombre = data.data.nombre;
      this.tipoMatricula = data.data.tipoMatricula;
      this.matricula = data.data.matricula;
      this.monto = data.data.monto;
      this.matricId = data.data.matricId;
      this.email = data.data.email;
    });
  }

 

  limpiarCuotas() {
    if (this.tipotarjeta != 'credito') {
      this.cuotas = undefined;
    }
  }

  select(medioDePago: string) {
    if (this.tipotarjeta == 'debito') {
      this.cuotas = "1";
    }
    //this.derechoAnualService.pagarBoleta(medioDePago, this.cuotas)
    //.subscribe(data => {
      this.buildForm(medioDePago);
    }
  
  buildForm(medioDePago: string) {
    
    var my_form=document.createElement('FORM') as any;
    my_form.method='POST';
    my_form.action='https://sps.decidir.com/sps-ar/Validar';

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='CUOTAS';
    my_tb.value=this.cuotas;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='NROCOMERCIO';
    my_tb.value='00050711';
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='NROOPERACION';
    my_tb.value=this.matricId;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='MEDIODEPAGO';
    my_tb.value=medioDePago;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='MONTO';
    my_tb.value=`${this.monto}00`;
    my_form.appendChild(my_tb);

    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='EMAILCLIENTE';
    my_tb.value=this.email;
    my_form.appendChild(my_tb);
    
    var my_tb=document.createElement('INPUT') as any;
    my_tb.type='HIDDEN';
    my_tb.name='URLDINAMICA';
    my_tb.value=environment.oldSiteUrl + '/api/consejo/resultadooperacioncpaumail';
    my_form.appendChild(my_tb);

    document.body.appendChild(my_form);
    my_form.submit();
  }

}
