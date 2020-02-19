import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SiteLoader } from '@app/_services';
import { Observable, of } from 'rxjs';
import { debounceTime,distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-home',
  templateUrl: './button-home.component.html',
  styleUrls: ['./button-home.component.css']
})
export class ButtonHomeComponent implements OnInit {
  servicios: Observable<any>;
  herramientas: Observable<any>;
  ejercicioprofesional: Observable<any>;
  prodExternos: Observable<any>;
  consejo: Observable<any>;
  keyword = 'title';
  resultSearch: any;
  private search: string;
  @ViewChild("autoComplete", {static: false}) autoComplete: ElementRef;

  constructor(private siteLoader: SiteLoader, public router: Router) { }

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

  onBtnSearch(){
    this.siteLoader.getSearch(this.search)
    .subscribe(data => this.resultSearch = data);
  }

  selectEvent(item) {
    this.router.navigateByUrl('/nota/' + item.sectionContentId);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    this.search = search.trim();
    if(this.search.length > 2)
    {
      this.siteLoader.getSearch(this.search)
      .pipe(debounceTime(1000),distinctUntilChanged())
      .subscribe(data => this.resultSearch = data);
    }
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
}
