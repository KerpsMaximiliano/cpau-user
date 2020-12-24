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
import { CurriculumVitaeComponent } from './components/curriculum-vitae/curriculum-vitae.component';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [ExperienciaComponent, CursosComponent, PosgradosComponent, ActividadProfesionalComponent, CurriculumVitaeComponent],
  imports: [
    CommonModule,
    OfertaServiciosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DpDatePickerModule,
    GestionModule,
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class OfertaServiciosModule { }
