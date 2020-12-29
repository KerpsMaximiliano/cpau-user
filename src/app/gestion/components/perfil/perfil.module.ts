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
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from '@app/shared/service/datepicker-format.service';

export var options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [IdentificacionComponent,
    DomicilioComponent,
    TelefonoComponent,
    RedesComponent,
    MailComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DpDatePickerModule,
    GestionModule,
    NgxMaskModule.forRoot(options),

    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class PerfilModule { }
