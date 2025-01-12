import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculaRoutingModule } from './matricula-routing.module';
import { ResumenComponent } from './components/resumen/resumen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from '@app/gestion/gestion.module';
import { ToastrModule } from 'ngx-toastr';
import { DerechoAnualComponent } from './components/derecho-anual/derecho-anual.component';
import { PagarBoletaComponent } from './components/derecho-anual/pagar-boleta/pagar-boleta.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { CredencialComponent } from './components/credencial/credencial.component';


@NgModule({
  declarations: [ResumenComponent, DerechoAnualComponent, PagarBoletaComponent, CertificadoComponent, CredencialComponent],
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
