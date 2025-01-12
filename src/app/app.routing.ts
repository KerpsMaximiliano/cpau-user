﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './login/register';
import { RecoverComponent } from './login/recover';
import { ConfirmComponent } from './login/recover/confirm';
import { ProfessionalNeedComponent } from './Professional/profesional-need';
import { ContactoProfesionalComponent } from './Professional/contacto-profesional/contacto-profesional.component';
import { MastertemplateComponent } from './home/components/templates/mastertemplate.component';
import { NoteComponent } from './home/components/note/note.component';
import { PadronComponent } from './padron/padron.component';
import { FichatecnicaComponent } from './fichatecnica/fichatecnica.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ContactoAnuncianteComponent } from './contacto-anunciante/contacto-anunciante.component';
import { BoletinesComponent } from './boletines/boletines.component';
import { NotePreviewComponent } from './home/components/notePreview/notePreview.component';
import { FormComponent } from './form/form.component';
import { PreregisterComponent } from './login/preregister';
import { AuthGuard } from './_helpers';
import { ActualizacionEmailComponent } from './gestion/components/perfil/components/actualizacion-email/actualizacion-email.component';
import { PagoCpauMailComponent } from './pagocpaumail/pagocpaumail.component';
import { ConstanciaComponent } from './form/constancia/constancia.component';
import { FinalMessageComponent } from './form/final-message/final-message.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'boletin/:idBoletin',
    component: BoletinesComponent,
  },
  {
    path: 'formularios/mensajefinal',
    component: FinalMessageComponent,
  },
  {
    path: 'formularios/:idFormulario',
    component: FormComponent,
  },
  {
    path: 'formularios/constancia/:uid',
    component: ConstanciaComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'preregistrar',
    component: PreregisterComponent,
  },
  {
    path: 'registrar',
    component: RegisterComponent,
  },
  {
    path: 'actualizacion-email',
    component: ActualizacionEmailComponent,
  },
  {
    path: 'recover',
    component: RecoverComponent,
  },
  {
    path: 'passwordrecovery/confirm',
    component: ConfirmComponent,
  },
  {
    path: 'profesionales',
    component: ProfessionalNeedComponent,
  },
  {
    path: 'profesional/contacto/:guid',
    component: ContactoProfesionalComponent,
  },
  {
    path: 'buscarpadron',
    component: PadronComponent,
  },
  {
    path: 'anunciantes',
    component: ContactoAnuncianteComponent,
  },
  {
    path: ':namesection',
    component: MastertemplateComponent,
  },
  {
    path: ':namesection/:namesection',
    component: MastertemplateComponent,
  },
  {
    path: 'nota/:id',
    component: NoteComponent,
  },
  {
    path: 'notaPreview/:id',
    component: NotePreviewComponent,
  },
  {
    path: 'ficha/:guid',
    component: FichatecnicaComponent,
  },
  {
    path: 'pagocpaumail/:guid',
    component: PagoCpauMailComponent,
  },
  {
    path: 'contacto/general',
    component: ContactoComponent,
  },
  {
    path: 'gestion',
    loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionModule),
    canActivate: [AuthGuard] 
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
