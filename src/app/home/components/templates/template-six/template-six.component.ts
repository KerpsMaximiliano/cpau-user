import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { TemplateWrapper } from '@app/shared/interface/template.wrapper';
import { ContentSite, ItemsSite, DEAFULT_IMAGE, BreadCrumb } from '@app/shared/models/contentsite.model';

declare function recortarTituloListado(text);
declare function recortarSummaryListado(text);

@Component({
  selector: 'app-template-six',
  templateUrl: './template-six.component.html',
  styleUrls: ['./template-six.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateSixComponent implements OnInit, TemplateWrapper, AfterViewInit {

  @Input() public data: ContentSite;
  @Output() changeComponent: EventEmitter<any> = new EventEmitter<any>();
  dataOld: ContentSite;
  destacado: ItemsSite[];
  noDestacado: ItemsSite[];
  breadCrumb: BreadCrumb[];

  constructor() { }

  ngAfterViewInit(): void {
    this.resetStyeTags(localStorage.getItem('tagSelected'));
  }

  ngOnInit() {
    localStorage.setItem('tagSelected', this.data.filterApply);
    this.dataOld = Object.assign({}, this.data);
    this.breadCrumb = this.dataOld.breadCrumb;

    this.destacado = this.data.items.filter(x => x.highlighted);
    this.noDestacado = this.data.items.filter(x => !x.highlighted);

    this.noDestacado.forEach(nota => {
      nota.title = recortarTituloListado(nota.title);
      nota.summary = recortarSummaryListado(nota.summary);

      if (!nota.image || nota.image == null || nota.image.imageUrl === '') {
        nota.image = {imageUrl: DEAFULT_IMAGE};
      }

    });

    this.resetStyeTags(localStorage.getItem('tagSelected'));
  }

  onSelectTag(tag) {
    localStorage.setItem('tagSelected', tag);
    this.resetStyeTags(tag);
    this.changeComponent.emit(tag);
  }

  private resetStyeTags(tag) {
    document.getElementsByName('categories').forEach(element => {
      const el = document.getElementById('lbl' + element.id.replace('#', ''));

      if (el) {
        if (element.id.replace('#', '') === tag.replace('#', '')) {
          el.style.color = '#fff';
          el.style.backgroundColor  = '#000000';
        } else {
          el.style.color = '#000000';
          el.style.backgroundColor  = '#fff';
        }
      }
    });
  }

  selectTarget(index) {
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