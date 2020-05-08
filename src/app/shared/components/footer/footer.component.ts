import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteLoader } from '@app/_services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterHomeComponent implements OnInit {
  servicios: Observable<any>;
  herramientas: Observable<any>;
  ejercicioprofesional: Observable<any>;
  prodExternos: Observable<any>;
  consejo: Observable<any>;

  constructor(private siteLoader: SiteLoader) { }

  ngOnInit() {
    this.siteLoader.GetMenusTo("EL CONSEJO")
    .subscribe(data => this.consejo = data);

    this.siteLoader.GetMenusTo("SERVICIOS")
    .subscribe(data => this.servicios = data);

    this.siteLoader.GetMenusTo("HERRAMIENTAS")
    .subscribe(data => this.herramientas = data);

    this.siteLoader.GetMenusTo("EJERCICIO PROFESIONAL")
    .subscribe(data => this.ejercicioprofesional = data);

    this.siteLoader.GetMenusExtProd()
    .subscribe(data => this.prodExternos = data);
  }

  selectTarget(index){
    let target = '';
    switch (index) {
      case 0:
        target = '_self';
        break;
      case 1:
        target = '_blank';        
        break;
      case 2:
        target = '_parent';        
        break;
      case 3:
        target = '_top';    
        break;
      case 4:
        target = '_search';    
        break;
      default:
        break;
    }
    return target;
  }

}
