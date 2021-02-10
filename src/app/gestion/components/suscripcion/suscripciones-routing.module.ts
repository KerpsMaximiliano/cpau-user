import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { NewsletterComponent } from './newsletter.component';
import { PublicacionComponent } from './publicaciones.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: 'publicaciones',
        pathMatch: 'full'
    },
    {
        path: 'publicaciones',
        component: PublicacionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'newsletter',
        component: NewsletterComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuscripcionesRoutingModule { }
