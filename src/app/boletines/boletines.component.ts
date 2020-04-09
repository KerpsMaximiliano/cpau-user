import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SiteLoader } from '@app/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletines.component.html',
  styleUrls: ['./boletines.component.css']
})
export class BoletinesComponent implements OnInit {
  data: any;
  page: any;
  currentLocation = location.origin;

  constructor(private _Activatedroute:ActivatedRoute,private siteLoader: SiteLoader) { }

  ngOnInit() {
    let id = this._Activatedroute.snapshot.paramMap.get("idBoletin");
    const idInt = id == null ? 0 : parseInt(id);
    this.siteLoader.bannerSubject.next({main: false, section: false, news: true});
    this.siteLoader.boletin(idInt)
    .subscribe(
        objSend => {
          if(objSend && objSend.data){
            this.data = objSend.data
          }else{
            document.write(objSend.page);
          }
        });
}

}
