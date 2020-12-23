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
import { DatepickerComponent } from '@app/shared/components/datepicker/datepicker.component';
import { CustomAdapter, CustomDateParserFormatter } from '@app/shared/components/datepicker/datepicker.service';
@NgModule({
  declarations: [HomeComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ActionTableComponent,
    CheckboxListComponent,
    DatepickerComponent,
    FormErrorComponent],
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
    DatepickerComponent,
    FormErrorComponent,
    NgbModule],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class GestionModule { }
