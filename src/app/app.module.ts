import { numberOnlyDirective } from './_directive/numbersOnly.directive';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { appRoutingModule } from "./app.routing";

import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { HeaderHomeComponent } from "./home/components/header/header-home/header-home.component";
import { ButtonHomeComponent } from "./home/components/header/button-home/button-home.component";
import { FooterHomeComponent } from "./shared/components/footer/footer.component";
import { RegisterComponent } from "./login/register/register.component";
import { RecoverComponent } from "./login/recover/recover.component";
import { ConfirmComponent } from "./login/recover/confirm/confirm.component";
import { PublicityHomeComponent } from "./shared/components/publicity-home/publicity-home.component";
import { ProfessionalNeedComponent } from "./Professional/profesional-need/professional-need.component";
import { TemplateOneComponent } from "./home/components/templates/template-one/template-one.component";
import { TemplateAgendaTagsComponent } from "./home/components/templates/template-agenda-tags/template-agenda-tags.component";
import { TemplateTwoComponent } from "./home/components/templates/template-two/template-two.component";
import { TemplateThreeComponent } from "./home/components/templates/template-three/template-three.component";
import { TemplateFourComponent } from "./home/components/templates/template-four/template-four.component";
import { TemplateFiveComponent } from "./home/components/templates/template-five/template-five.component";
import { MastertemplateComponent } from "./home/components/templates/mastertemplate.component";
import { RenderDirective } from "./_directive/renderhost.directive";
import { NoteComponent } from "./home/components/note/note.component";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { TemplateListComponent } from "./home/components/templates/template-list/template-list.component";
import { PadronComponent } from "./padron/padron.component";
import { FichatecnicaComponent } from "./fichatecnica/fichatecnica.component";
import { ContactoProfesionalComponent } from "./Professional/contacto-profesional/contacto-profesional.component";
import { ContactoComponent } from "./contacto/contacto.component";
import { ContactoAnuncianteComponent } from "./contacto-anunciante/contacto-anunciante.component";
import { TooltipModule } from "ng2-tooltip-directive";
import { CacheInterceptor } from "../app/_helpers/cache.interceptor";
import { BoletinesComponent } from "./boletines/boletines.component";
import { NotePreviewComponent } from "./home/components/notePreview/notePreview.component";
import { Safe } from "./_directive/pipeSafeHTML.directive";
import { FormComponent } from "./form/form.component";
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { PreregisterComponent } from "./login/preregister/preregister.component";
import { RegisterMatriculadoComponent } from './login/register/register-matriculado/register-matriculado.component';
import { RegisterNomatriculadoComponent } from './login/register/register-nomatriculado/register-nomatriculado.component'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './shared/components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActualizacionEmailComponent } from './gestion/components/perfil/components/actualizacion-email/actualizacion-email.component';
import { OwlModule } from 'ngx-owl-carousel';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoadingScreenInterceptor } from './_helpers/loading.interceptor';
import { PagoCpauMailComponent } from './pagocpaumail/pagocpaumail.component';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { ConstanciaComponent } from './form/constancia/constancia.component';
import { DynamicComponent } from './form/dynamic-component/dynamic-component.component';
import { ComponentContainer } from './form/directives/componentContainer';
import { LblSelectAdapterComponent } from './form/dynamicComponentsAdapters/lblSelect.componentAdapter';
import { SelectControlComponent } from './form/selectControl/selectControl.component';
import { LblInputStringAdapterComponent } from './form/dynamicComponentsAdapters/lblInput.string.componentAdapter';
import { StringInputControlComponent } from './form/inputControl/string.input.control';
import { TextAreaControlComponent } from './form/textareaControl/textareaControl.component';
import { LblTextareaAdapterComponent } from './form/dynamicComponentsAdapters/lblTextareacomponentAdapter';
import { LblCheckboxAdapterComponent } from './form/dynamicComponentsAdapters/lblCheckbox.componentAdapter';
import { CheckboxControlComponent } from './form/checkboxControl/checkboxControl.component';
import { LblRadioAdapterComponent } from './form/dynamicComponentsAdapters/lblRadio.componentAdapter';
import { RadioControlComponent } from './form/radioControl/radioControl.component';
import {NgxPrintModule} from 'ngx-print';
import { QRCodeModule } from 'angularx-qrcode';
//import { LightgalleryModule } from 'lightgallery/angular';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    AutocompleteLibModule,
    TooltipModule,
    RecaptchaModule, // this is the recaptcha main module
    RecaptchaFormsModule, // this is the module for form incase form validation
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BootstrapModalModule.forRoot({ container: document.body }),
    NgbModule,
    OwlModule,
    Angular2ImageGalleryModule,
    NgxPrintModule,
    QRCodeModule
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
    ProfessionalNeedComponent,
    TemplateOneComponent,
    TemplateTwoComponent,
    TemplateThreeComponent,
    TemplateFourComponent,
    TemplateFiveComponent,
    TemplateAgendaTagsComponent,
    MastertemplateComponent,
    RenderDirective,
    NoteComponent,
    NotePreviewComponent,
    TemplateListComponent,
    PadronComponent,
    FichatecnicaComponent,
    PagoCpauMailComponent,
    ContactoProfesionalComponent,
    ContactoComponent,
    ContactoAnuncianteComponent,
    BoletinesComponent,
    Safe,
    FormComponent,
    PreregisterComponent,
    RegisterMatriculadoComponent,
    RegisterNomatriculadoComponent,
    numberOnlyDirective,
    ModalComponent,
    ActualizacionEmailComponent,
    LoadingComponent,
    ConstanciaComponent,
    DynamicComponent,
    ComponentContainer,
    LblSelectAdapterComponent,
    SelectControlComponent,
    LblInputStringAdapterComponent,
    StringInputControlComponent,
    TextAreaControlComponent,
    LblTextareaAdapterComponent,
    LblCheckboxAdapterComponent,
    CheckboxControlComponent,
    LblRadioAdapterComponent,
    RadioControlComponent,
  ],
  exports:[
    SelectControlComponent,
    StringInputControlComponent,
    TextAreaControlComponent,
    LblTextareaAdapterComponent,
    LblCheckboxAdapterComponent,
    CheckboxControlComponent,
    LblRadioAdapterComponent,
    RadioControlComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    TemplateOneComponent,
    TemplateTwoComponent,
    TemplateThreeComponent,
    TemplateListComponent,
    TemplateFourComponent,
    TemplateFiveComponent,
    ModalComponent,
    TemplateAgendaTagsComponent,
    LblSelectAdapterComponent,
    LblInputStringAdapterComponent,
    LblTextareaAdapterComponent,
    LblCheckboxAdapterComponent,
    LblRadioAdapterComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
