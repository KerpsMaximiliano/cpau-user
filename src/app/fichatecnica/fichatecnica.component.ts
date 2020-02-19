import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteLoader } from '@app/_services';

@Component({
  selector: 'app-fichatecnica',
  templateUrl: './fichatecnica.component.html',
  styleUrls: ['./fichatecnica.component.css']
})
export class FichatecnicaComponent implements OnInit {
  data: any;
  constructor(private _Activatedroute:ActivatedRoute, private siteLoader: SiteLoader) { }

  ngOnInit() {
    const guid = this._Activatedroute.snapshot.paramMap.get("guid");
    this.siteLoader.getFicha(guid).subscribe( data =>{
      this.data =data;
    });
  }

  back(){
    javascript:history.go(-1);return false;
  }

}
