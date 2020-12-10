import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
      },
      {
        path: 'matricula',
        loadChildren: () => import('./components/matricula/matricula.module').then(m => m.MatriculaModule),
      },
      {
        path: 'oferta-servicios',
        loadChildren: () => import('./components/oferta-servicios/oferta-servicios.module').then(m => m.OfertaServiciosModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
