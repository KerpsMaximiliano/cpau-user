import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatosEnvio } from '../../models/datosEnvio.model';
import { Producto } from '../../models/producto.model';
import { StoreService } from '../../services/store.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public urlHelp = 'https://www.cpau.org/nota/35840';
  collapsed: boolean;
  loading: boolean;
  productos: Producto[];
  datosEnvio: DatosEnvio;
  datosEnvioForm: FormGroup;
  domicilioParticular: any;
  enviable: boolean;
  solicitarEnvio: boolean;

  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder
  ) {
    this.productos = [];
    this.enviable = false;
    this.solicitarEnvio = false;
    this.datosEnvioForm = this.formBuilder.group({
      destinatario: ['', Validators.required],
      tipoDomicilio: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    this.datosEnvioForm.disable();
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.storeService.getAllProductos().subscribe(res => {
      let localStorProductos = [];
      if (localStorage.getItem('productos')) {
        localStorProductos = JSON.parse(localStorage.getItem('productos'));
        res.data.forEach(responseProd => {
          const productFound = localStorProductos.find(localStorProducto => localStorProducto.productoId == responseProd.id);
          if (productFound) {
            this.productos.push({...responseProd , cantidad: productFound.cantidad});
            if (responseProd.enviable) {
              this.enviable = true;
            }
          }
        });
      }
    },(err) => console.log(err), () => {
      this.storeService.getDatosEnvio().subscribe(res => {
        this.datosEnvio = res.data;
        this.domicilioParticular = this.datosEnvio.domicilios.find(d => d.tipo === 'Particular');
      });
    });
  }

  onChangeCheckbox(event) {
    this.solicitarEnvio = event.target.checked;
    if (event.target.checked) {
      this.enableForm();
      // if (!this.datosEnvio) {
      //   this.storeService.getDatosEnvio().subscribe(res => {
      //     this.datosEnvio = res.data;
      //   }, (err) => console.log(err), () => this.enableForm());
      // } else {
      //   this.enableForm();
      // }
    } else {
      this.datosEnvioForm.disable();
    }
  }

  onChangeTipoDomicilio(value) {
    if (value !== 'Nuevo') {
      const domicilio = this.datosEnvio.domicilios.find(d => d.tipo === value);
      this.direccion.patchValue(domicilio.domicilio);
    } else {
      this.direccion.patchValue('');
    }
  }

  calcTotal() {
    const initialValue = 0;
    let total = this.productos.reduce(
    (previousValue, currentValue) => previousValue + currentValue.precio * currentValue.cantidad,
    initialValue
    );
    return total;
  }

  select(tarjeta) {
    if (!this.datosEnvioForm.invalid) {
      localStorage.removeItem('productos');
      const productos = this.productos.map(producto => {
        return {productoId: producto.id, cantidad: producto.cantidad};
      });
      this.storeService.postCheckout(productos, tarjeta, 1, this.solicitarEnvio, this.destinatario.value, this.direccion.value)
      .subscribe(res => {
        this.buildForm(res.data);
      });
    }
  }

  enableForm() {
    this.datosEnvioForm.enable();
    this.destinatario.patchValue(this.datosEnvio.nombre);
    const domicilioParticular = this.datosEnvio.domicilios.find(d => d.tipo === 'Particular');
    if (domicilioParticular) {
      this.tipoDomicilio.patchValue('Particular');
      this.direccion.patchValue(domicilioParticular.domicilio);
    }
  }

  get destinatario() {
    return this.datosEnvioForm.get('destinatario');
  }
  get tipoDomicilio() {
    return this.datosEnvioForm.get('tipoDomicilio');
  }
  get direccion() {
    return this.datosEnvioForm.get('direccion');
  }

  buildForm(data) {

    var my_form = document.createElement('FORM') as any;
    my_form.method = 'POST';
    my_form.action = 'https://sps.decidir.com/sps-ar/Validar';

    var my_tb = document.createElement('INPUT') as any;
    my_tb.type = 'HIDDEN';
    my_tb.name = 'CUOTAS';
    my_tb.value = data.cuotas;
    my_form.appendChild(my_tb);

    var my_tb = document.createElement('INPUT') as any;
    my_tb.type = 'HIDDEN';
    my_tb.name = 'NROCOMERCIO';
    my_tb.value = '00050711';
    my_form.appendChild(my_tb);

    var my_tb = document.createElement('INPUT') as any;
    my_tb.type = 'HIDDEN';
    my_tb.name = 'NROOPERACION';
    my_tb.value = data.nroOperacion;
    my_form.appendChild(my_tb);

    var my_tb = document.createElement('INPUT') as any;
    my_tb.type = 'HIDDEN';
    my_tb.name = 'MEDIODEPAGO';
    my_tb.value = data.medioDePago;
    my_form.appendChild(my_tb);

    var my_tb = document.createElement('INPUT') as any;
    my_tb.type = 'HIDDEN';
    my_tb.name = 'MONTO';
    my_tb.value = `${data.monto}00`;
    my_form.appendChild(my_tb);

    var my_tb = document.createElement('INPUT') as any;
    my_tb.type = 'HIDDEN';
    my_tb.name = 'EMAILCLIENTE';
    my_tb.value = data.emailCliente;
    my_form.appendChild(my_tb);

    var my_tb = document.createElement('INPUT') as any;
    my_tb.type = 'HIDDEN';
    my_tb.name = 'URLDINAMICA';
    my_tb.value = environment.apiUrl + '/api/Store/resultadooperacionproducto';
    my_form.appendChild(my_tb);

    document.body.appendChild(my_form);
    my_form.submit();
  }

  reload() {
    this.initData();
  }

}
