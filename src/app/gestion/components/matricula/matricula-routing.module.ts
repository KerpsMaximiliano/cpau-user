import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { CredencialComponent } from './components/credencial/credencial.component';
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
    canActivate: [AuthGuard] 
  },
  {
    path: 'derecho-anual',
    component: DerechoAnualComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'certificado',
    component: CertificadoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'credencial',
    component: CredencialComponent,
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaRoutingModule { }
