import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public urlHelp = 'https://www.cpau.org/nota/35839';
  collapsed: boolean;
  loading: boolean;
  productos: Producto[];
  categorias: Categoria[];
  selectedCategory: any;
  orderBy: any;

  constructor(private router: Router, private storeService: StoreService, private sanitizer: DomSanitizer) {
    this.selectedCategory = 'todos';
    this.orderBy = 'nombre';
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
      this.selectedCategory = this.router.getCurrentNavigation().extras.state.categoria;
    }
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.storeService.getAllCategorias().subscribe(res => {
        this.categorias = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.getAllProductos(this.selectedCategory, this.orderBy);
    });
  }

  onChangeCategoria(value) {
    this.selectedCategory = value;
    this.getAllProductos(value, this.orderBy);
  }

  onChangeOrdenar(value) {
    this.orderBy = value;
    this.getAllProductos(this.selectedCategory, value);
  }

  onClickDetalles(id) {
    this.router.navigate([this.router.url, id]);
  }

  onClickComprar(id) {
    this.addProducto(id);
    this.router.navigate(['gestion/home/store/carrito']);
  }

  addProducto(productoId) {
    let productos = [];
    if (localStorage.getItem('productos')) {
      productos = JSON.parse(localStorage.getItem('productos'));
    }
    if (!productos.some(p => p.productoId === productoId)) {
      productos.push({productoId, cantidad: 1});
    }
    localStorage.setItem('productos', JSON.stringify(productos));
}

  getAllProductos(categoria, orderBy) {
    this.storeService.getAllProductos(categoria, orderBy).subscribe(res => {
      this.productos = res.data;
    });
  }

  getImage(imgByte) {
    const objectURL = imgByte;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  reload() {
    this.initData();
  }

}
