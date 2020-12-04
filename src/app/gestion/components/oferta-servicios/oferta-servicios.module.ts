import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertaServiciosRoutingModule } from './oferta-servicios-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from '@app/gestion/gestion.module';
import { ToastrModule } from 'ngx-toastr';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';


@NgModule({
  declarations: [ExperienciaComponent],
  imports: [
    CommonModule,
    OfertaServiciosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GestionModule,
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class OfertaServiciosModule { }
