import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { IdentificacionComponent } from './components/identificacion/identificacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from '@app/gestion/gestion.module';
import { TelefonoComponent } from './components/telefono/telefono.component';


@NgModule({
  declarations: [IdentificacionComponent, TelefonoComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GestionModule
  ]
})
export class PerfilModule { }
