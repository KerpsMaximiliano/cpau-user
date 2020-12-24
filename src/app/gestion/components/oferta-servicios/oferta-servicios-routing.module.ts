import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { ActividadProfesionalComponent } from './components/actividad-profesional/actividad-profesional.component';
import { CurriculumVitaeComponent } from './components/curriculum-vitae/curriculum-vitae.component';
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
    canActivate: [AuthGuard] 
  },
  {
    path: 'actividad-profesional',
    component: ActividadProfesionalComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'cursos',
    component: CursosComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'posgrados',
    component: PosgradosComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'curriculum-vitae',
    component: CurriculumVitaeComponent,
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertaServiciosRoutingModule { }
