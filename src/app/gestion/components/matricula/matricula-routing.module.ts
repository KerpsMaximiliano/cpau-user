import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumenComponent } from './components/resumen/resumen.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'resumen',
    pathMatch: 'full'
  },
  {
    path: 'resumen',
    component: ResumenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaRoutingModule { }
