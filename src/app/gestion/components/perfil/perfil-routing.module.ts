import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomicilioComponent } from './components/domicilio/domicilio.component';
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
  },
  {
    path: 'telefonos',
    component: TelefonoComponent
  },
  {
    path: 'domicilio',
    component: DomicilioComponent
  },
  {
    path: 'emails',
    component: MailComponent
  },
  {
    path: 'redes',
    component: RedesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
