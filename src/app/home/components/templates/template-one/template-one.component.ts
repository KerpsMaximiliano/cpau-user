import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { TemplateWrapper } from '@app/shared/interface/template.wrapper';
import { ContentSite, ItemsSite, DEAFULT_IMAGE, BreadCrumb } from '@app/shared/models/contentsite.model';

declare function recortarTituloListadoTemplateOne(text);
declare function recortarSummaryListadoTemplateOne(text);

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateOneComponent implements OnInit, TemplateWrapper {

  @Input() data: ContentSite;
  @Output() changeComponent: EventEmitter<any> = new EventEmitter<any>();
  dataOld: ContentSite;
  destacado: ItemsSite[];
  noDestacado: ItemsSite[];
  breadCrumb:BreadCrumb[];

  constructor() { }

  ngOnInit() {
    this.dataOld = Object.assign({}, this.data);
    this.breadCrumb = this.dataOld.breadCrumb;
    this.destacado = this.data.items.filter(x=> x.highlighted);
    this.noDestacado = this.data.items.filter(x=> !x.highlighted);

    this.noDestacado.forEach(nota => {
      nota.title = recortarTituloListadoTemplateOne(nota.title);
      nota.summary = recortarSummaryListadoTemplateOne(nota.summary);
     
        if (!nota.image || nota.image == null || nota.image.imageUrl == '') {
          nota.image = {imageUrl: DEAFULT_IMAGE};
        }
    
    });

  }

  onSelectTag(tag) {
    this.changeComponent(tag);
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
