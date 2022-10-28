import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  public urlHelp = 'BETO PONE LA URL DE LA NOTA ACA';
  collapsed: boolean;
  loading: boolean;
  quantity: FormControl;
  producto: Producto;
  categoria: Categoria;
  error: any;

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
    const paramId = this.activatedRoute.snapshot.paramMap.get('id');
    this.storeService.getProductoById(paramId).subscribe(res => {
      this.producto = res.data;
      this.error = res.error;
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
