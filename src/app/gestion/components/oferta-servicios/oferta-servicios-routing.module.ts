import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertaServiciosRoutingModule { }
