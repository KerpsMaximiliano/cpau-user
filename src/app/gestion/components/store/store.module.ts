import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ProductosComponent } from './components/productos/productos.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


@NgModule({
  declarations: [ProductosComponent, DetallesComponent, CartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class StoreModule { }
