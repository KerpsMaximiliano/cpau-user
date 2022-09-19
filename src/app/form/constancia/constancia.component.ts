import { environment } from '@environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteLoader } from '@app/_services';
import { FormService } from '@app/_services/form.service';

@Component({
  selector: 'app-constancia',
  templateUrl: './constancia.component.html',
  styleUrls: ['./constancia.component.css']
})
export class ConstanciaComponent implements OnInit {

  qrdata: string;
  resp: any;
  form: any;
  data: any;
  page: any;
  currentLocation = location.origin;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private formService: FormService,
  ) { }

  ngOnInit() {
    const uid = this._Activatedroute.snapshot.paramMap.get('uid');
    this.qrdata = this.currentLocation + '/formularios/constancia/' + uid;
    this.formService.getUid(uid).subscribe(res => {
      this.resp = JSON.parse(res.data.response.fields);
      this.form = res.data.form;
      this.form.fields = JSON.parse(res.data.form.fields);
      this.resp.forEach((resp, index) => {
        this.form.fields.forEach(field => {
          if (resp.id === field.IdFormField) {
            this.resp[index].name = field.Name;
            this.resp[index].type = field.Type;
          }
        });
      });
    });
  }

  onPrint() {
    window.print();
  }

}
