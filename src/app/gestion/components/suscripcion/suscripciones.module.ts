import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from '@app/gestion/gestion.module';
import { ToastrModule } from 'ngx-toastr';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from '@app/shared/service/datepicker-format.service';
import { PublicacionComponent } from './publicaciones.component';
import { NewsletterComponent } from './newsletter.component';
import { SuscripcionesRoutingModule } from './suscripciones-routing.module';


@NgModule({
    declarations: [PublicacionComponent, NewsletterComponent],
    imports: [
        CommonModule,
        SuscripcionesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        GestionModule,
        ToastrModule.forRoot(), // ToastrModule added
    ],
    providers: [
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
    ]
})
export class SuscripcionModule { }
