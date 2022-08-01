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
  encapsulation: ViewEncapsulation.None
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
        this.router.navigate(['/formulario/constancia', response.data] );
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
          if(field.required){
            this.form.addControl(field.id, new FormControl('', Validators.required));
          } else { this.form.addControl(field.id, new FormControl()); }
          this.form.addControl(field.id, new FormControl());
        });
      }
    },err=>{console.log(err);
    });
  }

  onClick() {
    const requestArr = [] ;
    this.fields.forEach(element => {
      const jsonRequest = {};
      jsonRequest['id'] = element.id;
      jsonRequest['value'] = this.form.value[element.id]
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
    });
    this.formService.sendForm(this.idForm , requestArr).subscribe(res => {
      if (res.data.le === true) {
        this.messageLE = true;
        this.showForm = false;
      }
      if (res.data.showReceipt) {
        this.router.navigate(['/formulario/constancia', res.data.guid] );
      }
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
    // console.log(ev);
  }

}
