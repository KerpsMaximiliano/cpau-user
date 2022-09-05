import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  // Aplicar Lazy Loading
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('./components/perfil/perfil.module').then(m => m.PerfilModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'matricula',
        loadChildren: () => import('./components/matricula/matricula.module').then(m => m.MatriculaModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'oferta-servicios',
        loadChildren: () => import('./components/oferta-servicios/oferta-servicios.module').then(m => m.OfertaServiciosModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'suscripciones',
        loadChildren: () => import('./components/suscripcion/suscripciones.module').then(m => m.SuscripcionModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'store',
        loadChildren: () => import('./components/store/store.module').then(m => m.StoreModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./components/seguridad/seguridad.module').then(m => m.SeguridadModule),
        canActivate: [AuthGuard]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
