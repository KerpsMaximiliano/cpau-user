import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { IdentificacionComponent } from './components/identificacion/identificacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from '@app/gestion/gestion.module';
import { TelefonoComponent } from './components/telefono/telefono.component';
import { DomicilioComponent } from './components/domicilio/domicilio.component';
import { ToastrModule } from 'ngx-toastr';
import { RedesComponent } from './components/redes/redes.component';
import { MailComponent } from './components/mail/mail.component';


@NgModule({
  declarations: [IdentificacionComponent, DomicilioComponent, TelefonoComponent, RedesComponent, MailComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GestionModule,
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class PerfilModule { }
