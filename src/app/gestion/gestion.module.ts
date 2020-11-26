import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActionTableComponent } from '@app/shared/components/action-table/action-table.component';


@NgModule({
  declarations: [HomeComponent, MenuComponent, HeaderComponent, FooterComponent, ActionTableComponent],
  imports: [
    CommonModule,
    GestionRoutingModule,
  ],
  exports: [ActionTableComponent]
})
export class GestionModule { }
