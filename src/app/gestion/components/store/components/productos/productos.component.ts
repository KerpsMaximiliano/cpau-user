import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  collapsed: boolean;
  loading: boolean;
  productos: Producto[];
  // productosResponse: Producto[];
  categorias: Categoria[];
  selectedCategory: any;

  constructor(private router: Router, private storeService: StoreService) {
    this.selectedCategory = 'todos';
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
        this.getAllProductos(this.selectedCategory);
    });
    // this.storeService.getAllProductos().subscribe(res => {
    //   this.productosResponse = res.data;
    //   this.productos = res.data;
    // }, err => {
    //   console.log(err);
    // }, () =>{
    //   this.storeService.getAllCategorias().subscribe(res => {
    //     this.categorias = res.data;
    //   });
    // });
  }

  onChangeCategoria(value) {
    this.getAllProductos(value);
    // if (id === 'todos') {
    //   this.productos = this.productosResponse;
    // } else {
    //   this.productos = this.productosResponse.filter(producto => producto.idCategoria === Number(id));
    // }
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

  getAllProductos(categoria = 'todos') {
    this.storeService.getAllProductos(categoria).subscribe(res => {
      this.productos = res.data;
    });
  }

}
