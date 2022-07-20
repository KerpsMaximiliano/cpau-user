import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { SiteLoader } from '@app/_services';

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
  constructor(
    private _Activatedroute: ActivatedRoute,
    private siteLoader: SiteLoader,
    private router: Router) {
    this.form = new FormGroup({
    });
  }

  ngOnInit() {
    this.siteLoader.bannerSubject.next({main: false, section: false, news: true});
    const id = this._Activatedroute.snapshot.paramMap.get('idFormulario');
    const idInt = id == null ? 0 : parseInt(id);
    this.siteLoader.getForm(idInt).subscribe( response =>{
      if(response.error === 'YICC') {
        this.router.navigate(['/formulario/constancia', response.data] );
      }
      if(response.error === 'UNV') {
        this.router.navigate(['/login'], { queryParams: { redirect: this.router.routerState.snapshot.url } });
      }
      this.error = response.error;
      if (!response.data.fields) {
        this.fields = [];
      } else {
        console.log(response)
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
      }
      console.log(this.fields);
    },err=>{console.log(err);
    });
  }

  onClick() {
    const respArr = [] ;
    Object.keys(this.form.controls).forEach(key=> {
      respArr.push(this.form.get(key).value);
    });
    console.log(respArr)
  }

}
