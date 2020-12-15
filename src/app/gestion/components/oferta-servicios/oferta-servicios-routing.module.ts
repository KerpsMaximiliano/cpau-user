import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActividadProfesionalComponent } from './components/actividad-profesional/actividad-profesional.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { PosgradosComponent } from './components/posgrados/posgrados.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'actividad-profesional',
    pathMatch: 'full'
  },
  {
    path: 'experiencia',
    component: ExperienciaComponent,
  },
  {
    path: 'actividad-profesional',
    component: ActividadProfesionalComponent,
  },
  {
    path: 'cursos',
    component: CursosComponent,
  },
  {
    path: 'posgrados',
    component: PosgradosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertaServiciosRoutingModule { }
