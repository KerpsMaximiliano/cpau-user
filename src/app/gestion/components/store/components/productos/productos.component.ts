import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

// * Services.
import { StoreService } from "../../services/store.service";

// * Models.
import { Categoria } from "../../models/categoria.model";
import { Producto } from "../../models/producto.model";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"],
})
export class ProductosComponent implements OnInit {
  public urlHelp = "https://www.cpau.org/nota/35839";
  collapsed: boolean;
  loading: boolean;
  productos: Producto[];
  categorias: Categoria[];
  selectedCategory: any;
  orderBy: any;

  public search: string;
  public value: string;

  constructor(
    private _store: StoreService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.selectedCategory = "todos";
    this.orderBy = "default";
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras.state
    ) {
      this.selectedCategory =
        this.router.getCurrentNavigation().extras.state.categoria;
    }
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this._store.getAllCategorias().subscribe(
      (res) => {
        this.categorias = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.getAllProductos(this.selectedCategory, this.orderBy);
      }
    );
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
    this.router.navigate(["gestion/home/store/carrito"]);
  }

  addProducto(productoId) {
    let productos = [];
    if (localStorage.getItem("productos")) {
      productos = JSON.parse(localStorage.getItem("productos"));
    }
    if (!productos.some((p) => p.productoId === productoId)) {
      productos.push({ productoId, cantidad: 1 });
    }
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  getAllProductos(categoria, orderBy) {
    this._store.getAllProductos(categoria, orderBy).subscribe((res) => {
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

  public get(): void {
    this._store.get(this.search).subscribe({
      next: (res: any) => {
        if (res.status === "200" && res.ok) {
          if (res.data.length === 0) this.value = this.search;
          this.productos = res.data;
        }
      },
      error: (err) => console.error(err),
      complete: () => {},
    });
  }
}
