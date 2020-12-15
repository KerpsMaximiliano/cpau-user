import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertaServiciosRoutingModule } from './oferta-servicios-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from '@app/gestion/gestion.module';
import { ToastrModule } from 'ngx-toastr';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { PosgradosComponent } from './components/posgrados/posgrados.component';
import { ActividadProfesionalComponent } from './components/actividad-profesional/actividad-profesional.component';


@NgModule({
  declarations: [ExperienciaComponent, CursosComponent, PosgradosComponent, ActividadProfesionalComponent],
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
