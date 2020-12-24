import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
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
    canActivate: [AuthGuard] 
  },
  {
    path: 'contrasenia',
    component: ContraseniaComponent,
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
