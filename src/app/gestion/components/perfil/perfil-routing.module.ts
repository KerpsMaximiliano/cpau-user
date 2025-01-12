import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { InscripcionesComponent } from '../inscripciones/inscripciones.component';
import { DomicilioComponent } from './components/domicilio/domicilio.component';
import { FotoComponent } from './components/foto/foto.component';
import { IdentificacionComponent } from './components/identificacion/identificacion.component';
import { MailComponent } from './components/mail/mail.component';
import { RedesComponent } from './components/redes/redes.component';
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
    canActivate: [AuthGuard] 
  },
  {
    path: 'telefonos',
    component: TelefonoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'domicilio',
    component: DomicilioComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'emails',
    component: MailComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'redes',
    component: RedesComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'inscripciones',
    component: InscripcionesComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'fotos',
    component: FotoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
