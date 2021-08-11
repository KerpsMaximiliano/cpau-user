import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteLoader } from '@app/_services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterHomeComponent implements OnInit {
  servicios: any[] = [];
  herramientas: any[] = [];
  ejercicioprofesional: any[] = [];
  prodExternos: any[] = [];
  consejo: any[] = [];

  constructor(private siteLoader: SiteLoader) { }

  ngOnInit() {
    this.siteLoader.GetSectionMenu()
    .subscribe(x => {

      x.forEach(e => {
        switch (e.parentSeName) {
          case '/el-consejo':
            this.consejo.push(e);
            break;
          case '/herramientas':
            this.herramientas.push(e);
            break;
          case '/servicios':
            this.servicios.push(e);
            break;
          case '/ejercicio-profesional':
            this.ejercicioprofesional.push(e);
            break;
          default:
            break;
        }
      });       
    });

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
