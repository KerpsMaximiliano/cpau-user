import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { IdentificacionComponent } from './components/identificacion/identificacion.component';


@NgModule({
  declarations: [IdentificacionComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
