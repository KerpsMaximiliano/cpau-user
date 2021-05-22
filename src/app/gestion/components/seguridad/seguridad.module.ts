import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from '@app/gestion/gestion.module';
import { ToastrModule } from 'ngx-toastr';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ContraseniaComponent } from './components/contrasenia/contrasenia.component';


@NgModule({
  declarations: [UsuarioComponent, ContraseniaComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GestionModule,
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class SeguridadModule { }
