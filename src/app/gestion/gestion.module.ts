import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [HomeComponent, MenuComponent, HeaderComponent],
  imports: [
    CommonModule,
    GestionRoutingModule
  ]
})
export class GestionModule { }
