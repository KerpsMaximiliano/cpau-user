import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentificacionComponent } from './components/identificacion/identificacion.component';
import { TelefonoComponent } from './components/telefono/telefono.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'identificacion',
    pathMatch: 'full'
  },
  {
    path: 'identificacion',
    component: IdentificacionComponent,
  },
  {
    path: 'telefonos',
    component: TelefonoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
