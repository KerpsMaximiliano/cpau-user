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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { CheckboxListComponent } from '@app/shared/components/checkbox-list/checkbox-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [HomeComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ActionTableComponent,
    CheckboxListComponent,
    FormErrorComponent],
  imports: [
    CommonModule,
    GestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    BootstrapModalModule.forRoot({ container: document.body }),
    NgbModule
  ],
  exports: [ActionTableComponent,
    CheckboxListComponent,
    FormErrorComponent,
    NgbModule
  ],
  providers: [
  ],
})
export class GestionModule { }
