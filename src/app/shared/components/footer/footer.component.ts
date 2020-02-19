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

}
