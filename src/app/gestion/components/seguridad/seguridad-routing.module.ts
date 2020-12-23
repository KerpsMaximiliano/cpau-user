import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContraseniaComponent } from './components/contrasenia/contrasenia.component';
import { UsuarioComponent } from './components/usuario/usuario.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuario',
    pathMatch: 'full'
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
  },
  {
    path: 'contrasenia',
    component: ContraseniaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
