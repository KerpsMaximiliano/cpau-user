import { Routes, RouterModule } from '@angular/router';

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
import { BoletinesComponent } from './boletines/boletines.component';
import { NotePreviewComponent } from './home/components/notePreview/notePreview.component';
import { FormComponent } from './form/form.component';
import { PreregisterComponent } from './login/preregister';

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
    path: 'formulario/:idFormulario',
    component: FormComponent,
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
    path: ':namesection',
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
    path: 'contacto/general',
    component: ContactoComponent,
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
