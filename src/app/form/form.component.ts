import { FormService } from './../_services/form.service';
import { options } from './../gestion/components/perfil/perfil.module';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { SiteLoader } from '@app/_services';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FormComponent implements OnInit {
  fields: any;
  error: any;
  form: FormGroup;
  showForm = true;
  errorLE = false;
  messageLE = false;
  captcha = null;
  siteKey: string;
  response: any;
  idForm: string;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private formService: FormService,
    private router: Router) {
    this.siteKey = environment.recaptcha;
    this.form = new FormGroup({
    });
  }

  ngOnInit() {
    const id = this._Activatedroute.snapshot.paramMap.get('idFormulario');
    const idInt = id == null ? 0 : parseInt(id);
    this.formService.getForm(idInt).subscribe( response =>{
      if(response.error === 'YICC') {
        this.router.navigate(['/formularios/constancia', response.data] );
      }
      if(response.error === 'UNV') {
        this.router.navigate(['/login'], { queryParams: { redirect: this.router.routerState.snapshot.url } });
      }
      this.error = response.error;
      this.response = response;
      this.idForm = response.data.id;
      if (!response.data.fields) {
        this.fields = [];
      } else {
        if (response.error === 'LE') {
          this.errorLE = true;
          this.showForm = false;
        }
        let parseF = JSON.parse(response.data.fields);
        let jsonResponseArray = [];
        parseF.forEach(function (f) {
          let jsonResponse = {};
          jsonResponse['id'] = f.IdFormField;
          jsonResponse['name'] = f.Name;
          jsonResponse['type'] = f.Type;
          jsonResponse['dependentFieldId'] = (f.DependentField && f.DependentField.IdFormField !== '') ? f.DependentField.IdFormField : null ;
          jsonResponse['dependentValue'] = f.DependentValue === "" ? null : f.DependentValue;
          jsonResponse['required'] = f.Required;
          jsonResponse['value'] = f.Value;
          jsonResponse['options'] = [];
          if (f.Options) {
            f.Options.forEach(function (o) {
                let jsonOption = {};
                jsonOption['id'] = o.IdFormFieldOption;
                jsonOption['text'] = o.Text;
                jsonOption['value'] = o.Value;
                jsonOption['allowcomments'] = o.allowComments;
                jsonOption['comments'] = o.comments;
                jsonResponse['options'].push(jsonOption);
            });
          }
          jsonResponseArray.push(jsonResponse);
        });
        this.fields = jsonResponseArray;
        this.fields.forEach(field => {
          if (field.dependentFieldId && field.dependentValue) {
            field.disabled = true;
            if (field.required && field.type !== 'label') {
              this.form.addControl(field.id, new FormControl({value:'', disabled: true }, Validators.required));
            } else if (field.type !== 'label') {
              this.form.addControl(field.id, new FormControl({value:'', disabled: true }));
            }
          } else if (field.required && field.type !== 'label') {
            this.form.addControl(field.id, new FormControl('', Validators.required));
          } else if (field.type !== 'label') {
            this.form.addControl(field.id, new FormControl());
          }
        });
      }
    },err=>{console.log(err);
    });
  }

  onClick() {
    const requestArr = [] ;
    this.fields.forEach(element => {
      if (element.disabled !== true) {
      const jsonRequest = {};
      jsonRequest['id'] = element.id;
      jsonRequest['value'] = this.form.value[element.id] || '';
      jsonRequest['options'] = [];
      if (element.options !== []){
        element.options.forEach(option => {
          let jsonOption = {};
          jsonOption['id'] = option.id;
          jsonOption['allowcomments'] = option.allowcomments;
          if (option.allowcomments && this.form.get(option.id) !== null) {
            jsonOption['comments'] = this.form.value[option.id];
          }
          jsonRequest['options'].push(jsonOption);
        });
      }
      requestArr.push(jsonRequest);
      }
    });
    this.formService.sendForm(this.idForm , requestArr).subscribe(res => {
      if (res.data.le === true) {
        this.messageLE = true;
        this.showForm = false;
      } else if (res.data.showReceipt) {
        this.router.navigate(['/formularios/constancia', res.data.guid] );
      } else if (res.data.showReceipt === false && res.data.finalMessage) {
        this.router.navigate(['/formularios/mensajefinal'], { state: { finalMessage: res.data.finalMessage } });
      } else {this.showForm = false; }
    }, err => {console.log(err);
    });
  }

  onShowForm() {
    this.showForm = true;
    this.errorLE = false;
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  changeEmit(ev) {
    if (typeof(ev.parentValue) === 'object') {
      this.fields.forEach(field => {
        if (field.dependentFieldId && field.dependentFieldId === ev.data.id && field.dependentValue 
          && Object.values(ev.parentValue).includes(field.dependentValue)) {
          if (this.form.get(field.id)){
            this.form.controls[field.id].enable();
          }
          field.disabled = false;
        } else if (field.dependentFieldId && field.dependentFieldId === ev.data.id && field.dependentValue 
        && !Object.values(ev.parentValue).includes(field.dependentValue) && field.disabled === false) {
          if (this.form.get(field.id)){
            this.form.controls[field.id].disable();
            this.form.controls[field.id].patchValue('');
          }
          field.disabled = true
        }
      });
    } else {
    this.fields.forEach(field => {
      if (field.dependentFieldId && field.dependentFieldId === ev.data.id && field.dependentValue && field.dependentValue === ev.parentValue) {
        if (this.form.get(field.id)){
          this.form.controls[field.id].enable();
        }
        field.disabled = false;
      }
      if (field.dependentFieldId && field.dependentFieldId === ev.data.id 
        && field.dependentValue && field.dependentValue !== ev.parentValue && field.disabled === false) {
          if (this.form.get(field.id)){
            this.form.controls[field.id].disable();
            this.form.controls[field.id].patchValue('');
          }
          field.disabled = true;
        }
      });
    }
  }

}
