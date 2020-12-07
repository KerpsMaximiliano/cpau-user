import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';


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
    path: 'cursos',
    component: CursosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertaServiciosRoutingModule { }
