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
  servicios: any[] = [];
  herramientas: any[] = [];
  ejercicioprofesional: any[] = [];
  prodExternos: any[] = [];
  consejo: any[] = [];
  keyword = 'title';
  resultSearch: any;
  private search: string;
  @ViewChild("autoComplete", {static: false}) autoComplete: ElementRef;

  constructor(private siteLoader: SiteLoader, public router: Router) { }

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

  onBtnSearch(){
    this.siteLoader.getSearch(this.search)
    .subscribe(data => this.resultSearch = data);
  }

  selectEvent(item) {
    this.router.navigate(['/nota/' + item.sectionContentId]);
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
