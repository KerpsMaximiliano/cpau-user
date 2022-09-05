import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  collapsed: boolean;
  loading: boolean;
  productos: Producto[];
  cantidadForm: FormGroup;

  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.cantidadForm = this.formBuilder.group({});
    this.productos = [];
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.storeService.getAllProductos().subscribe(res => {
      let localStorProductos = [];
      const productos = [];
      if (localStorage.getItem('productos')) {
        localStorProductos = JSON.parse(localStorage.getItem('productos'));
        res.data.forEach(responseProd => {
          const productFound = localStorProductos.find(localStorProducto => Number(localStorProducto.productoId) === responseProd.id);
          if (productFound) {
            productos.push({...responseProd , cantidad: productFound.cantidad});
            this.cantidadForm.addControl(responseProd.id, new FormControl(productFound.cantidad, {
              validators: [Validators.required, Validators.min(1)]
            }));
          }
        });
        this.productos = productos;
      }
    });
  }

  removeProducto(productoId) {
    this.productos = this.productos.filter(producto => producto.id !== productoId);
    let localStorProductos = JSON.parse(localStorage.getItem('productos'));
    localStorProductos = localStorProductos.filter(localStorProducto => localStorProducto.productoId !== productoId);
    localStorage.setItem('productos', JSON.stringify(localStorProductos));
  }

  onChangeCantidad(id) {
    this.productos.map(producto =>{
      if (producto.id === id) {
        const cantidad = this.cantidadForm.get(producto.id.toString()).value;
        producto.cantidad = cantidad;
        const localStorProductos = JSON.parse(localStorage.getItem('productos'));
        const updatedList = localStorProductos.filter(localStorProducto =>
          localStorProducto.productoId !== producto.id
        ).concat({productoId: producto.id, cantidad});
        localStorage.setItem('productos', JSON.stringify(updatedList));
      }
      return producto;
    });
  }

  calcTotal() {
    const initialValue = 0;
    let total = this.productos.reduce(
    (previousValue, currentValue) => previousValue + currentValue.precio * currentValue.cantidad,
    initialValue
    );
    return total;
  }

  onClickContinuarCompra() {
    this.router.navigate(['/gestion/home/store/productos']);
  }

  onClickSiguiente() {
    this.router.navigate(['/gestion/home/store/checkout']);
  }

}
