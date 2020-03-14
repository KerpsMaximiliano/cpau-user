﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { HeaderHomeComponent } from './home/components/header/header-home/header-home.component';
import { ButtonHomeComponent } from './home/components/header/button-home/button-home.component';
import { FooterHomeComponent } from './shared/components/footer/footer.component';
import { RegisterComponent } from './login/register/register.component';
import { RecoverComponent } from './login/recover/recover.component';
import { ConfirmComponent } from './login/recover/confirm/confirm.component';
import { PublicityHomeComponent } from './shared/components/publicity-home/publicity-home.component';
import { PublicityRegisterComponent } from './shared/components/publicity-register/publicity-register.component';
import { ProfessionalNeedComponent } from './Professional/profesional-need/professional-need.component';
import { TemplateOneComponent } from './home/components/templates/template-one/template-one.component';
import { TemplateTwoComponent } from './home/components/templates/template-two/template-two.component';
import { TemplateThreeComponent } from './home/components/templates/template-three/template-three.component';
import { MastertemplateComponent } from './home/components/templates/mastertemplate.component';
import { RenderDirective } from './_directive/renderhost.directive';
import { NoteComponent } from './home/components/note/note.component';
import { AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TemplateListComponent } from './home/components/templates/template-list/template-list.component';
import { PadronComponent } from './padron/padron.component';
import { FichatecnicaComponent } from './fichatecnica/fichatecnica.component';
import { ContactoProfesionalComponent } from './Professional/contacto-profesional/contacto-profesional.component';
import { ContactoComponent } from './contacto/contacto.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CacheInterceptor } from '../app/_helpers/cache.interceptor';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        AutocompleteLibModule,
        TooltipModule ,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        HeaderHomeComponent,
        ButtonHomeComponent,
        FooterHomeComponent,
        RegisterComponent,
        RecoverComponent,
        ConfirmComponent,
        PublicityHomeComponent,
        PublicityRegisterComponent,
        ProfessionalNeedComponent,
        TemplateOneComponent,
        TemplateTwoComponent,
        TemplateThreeComponent,
        MastertemplateComponent,
        RenderDirective,
        NoteComponent,
        TemplateListComponent,
        PadronComponent,
        FichatecnicaComponent,
        ContactoProfesionalComponent,
        ContactoComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
    ],
    entryComponents:[TemplateOneComponent,TemplateTwoComponent,TemplateThreeComponent,TemplateListComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }