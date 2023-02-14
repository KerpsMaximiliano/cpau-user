import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-producto-temporal',
  templateUrl: './producto-temporal.component.html',
  styleUrls: ['./producto-temporal.component.css']
})
export class ProductoTemporalComponent implements OnInit {

  public urlHelp = 'https://www.cpau.org/nota/35839';
  collapsed: boolean;
  loading: boolean;
  quantity: FormControl;
  producto: Producto;
  categoria: Categoria;
  error: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private sanitizer: DomSanitizer
  ) {
    this.quantity = new FormControl('', {
      validators: [Validators.required, Validators.min(1)],
      updateOn: 'change'
    });
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    const paramHash = this.activatedRoute.snapshot.paramMap.get('hash');
    this.storeService.getProductoTemporalByToken(paramHash).subscribe(res => {
      this.error = res.error;
      this.producto = res.data;
    }, (err) => console.log(err)
    , () => {
      this.storeService.getAllCategorias().subscribe(res => {
        this.categoria = res.data.find(c => c.id === this.producto.idCategoria);
      });
    });
  }

  onClickComprar() {
    this.addProducto(this.producto.id);
    this.router.navigate(['/gestion/home/store/carrito']);
  }

  addProducto(productoId) {
    let productos = [];
    if (localStorage.getItem('productos')) {
      productos = JSON.parse(localStorage.getItem('productos'));
    }
    if (!productos.some(p => p.productoId === productoId)) {
      productos.push({productoId, cantidad: this.quantity.value});
    } else {
      productos.map(p => {
        if (p.productoId === productoId) {p.cantidad = this.quantity.value; }
        return p;
      });
    }
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  onClickCategoria() {
    this.router.navigate(['/gestion/home/store'], {state: {categoria: this.categoria.id}});
  }

  getImage(imgByte) {
    const objectURL = 'data:image/png;base64,' + imgByte;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  reload() {
    this.initData();
  }

}
