import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculaRoutingModule } from './matricula-routing.module';
import { ResumenComponent } from './components/resumen/resumen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from '@app/gestion/gestion.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [ResumenComponent],
  imports: [
    CommonModule,
    MatriculaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GestionModule,
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class MatriculaModule { }
