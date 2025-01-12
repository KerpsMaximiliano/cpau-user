import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteLoader } from '@app/_services';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-fichatecnica',
  templateUrl: './fichatecnica.component.html',
  styleUrls: ['./fichatecnica.component.css']
})
export class FichatecnicaComponent implements OnInit {
  data: any;
  guid: string;
  archivo: boolean;
  imgSrc: string | ArrayBuffer = "stylesCustom/images/fas-fa-user-circle.svg";
  website: string;

  constructor(private _Activatedroute:ActivatedRoute, private siteLoader: SiteLoader) { }

  ngOnInit() {
    this.guid = this._Activatedroute.snapshot.paramMap.get("guid");
    this.siteLoader.getFicha(this.guid).subscribe( data =>{
      this.data = data;
      this.data.estado = this.data.estado == "Inactivo" ? "Debe pagar derecho anual" : this.data.estado;
      if (data && data.redes && data.redes.length > 0)
        this.website = data.redes.find(x => +x.data2 == 10).data1;
    });

    this.siteLoader.poseeCV(this.guid).subscribe(b =>{
      this.archivo =b;
    });

    this.siteLoader.readImage(this.guid).subscribe(i => {
      if (i.success) {
        this.imgSrc = 'data:image/jpg;base64,' + i.entity.image;
      }
    });
  }

  back(){
    javascript:history.go(-1);return false;
  }

  downloadCV() {
    this.archivo = false;
    this.siteLoader.getCV(this.guid, this.data.nombre, () => {
      this.archivo = true;
    });
  }

}
