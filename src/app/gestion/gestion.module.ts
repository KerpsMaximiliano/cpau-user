import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActionTableComponent } from '@app/shared/components/action-table/action-table.component';
import { FormErrorComponent } from '@app/shared/components/form-error/form-error.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { CheckboxListComponent } from '@app/shared/components/checkbox-list/checkbox-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './components/seguridad/components/usuario/usuario.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';
@NgModule({
  declarations: [HomeComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ActionTableComponent,
    CheckboxListComponent,
    FormErrorComponent,
    SuscripcionComponent],
  imports: [
    CommonModule,
    GestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    BootstrapModalModule,
    NgbModule
  ],
  exports: [ActionTableComponent,
    CheckboxListComponent,
    FormErrorComponent,
    NgbModule],

})
export class GestionModule { }
