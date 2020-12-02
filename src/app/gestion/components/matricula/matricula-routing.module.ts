import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DerechoAnualComponent } from './components/derecho-anual/derecho-anual.component';
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
  {
    path: 'derecho-anual',
    component: DerechoAnualComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaRoutingModule { }
