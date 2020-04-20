import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TemplateWrapper } from '@app/shared/interface/template.wrapper';
import { ContentSite, ItemsSite } from '@app/shared/models/contentsite.model';

declare function recortarTituloListadoTemplateFour(text);
declare function recortarSummaryListadoTemplateFour(text);

@Component({
  selector: 'app-template-five',
  templateUrl: './template-five.component.html',
  styleUrls: ['./template-five.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateFiveComponent implements OnInit, TemplateWrapper {

  @Input() public data: ContentSite;
  dataOld: ContentSite;
  destacado: ItemsSite[];
  noDestacado: ItemsSite[];
  breadCrumb:string[];

  constructor() { }

  ngOnInit() {
    this.dataOld = Object.assign({}, this.data);
    this.breadCrumb = this.dataOld.breadCrumb.split('/');
    this.destacado = this.data.items.filter(x=> x.highlighted);
    this.noDestacado = this.data.items.filter(x=> !x.highlighted);

    this.noDestacado.forEach(nota => {
      nota.title = recortarTituloListadoTemplateFour(nota.title);
      nota.summary = recortarSummaryListadoTemplateFour(nota.summary);
    });

  }

  onSelectTag(tag) {
    this.resetStyeTags(tag);
    if(tag !== 'todos'){
      this.destacado = this.dataOld.items.filter(x=> x.highlighted).filter(x=> x.tags.includes(tag) ||  x.categories.includes(tag))
      this.noDestacado = this.dataOld.items.filter(x=> !x.highlighted).filter(x=> x.tags.includes(tag) ||  x.categories.includes(tag))
    }
    else{
      this.destacado = this.dataOld.items.filter(x=> x.highlighted)
      this.noDestacado = this.dataOld.items.filter(x=> !x.highlighted)
      this.data.items = this.dataOld.items;
    }
  }

  private resetStyeTags(tag) {
    document.getElementsByName('categories').forEach(element => {
      const el =document.getElementById('lbl'+element.id.replace("#", ""));

      if(el){
        if(element.id.replace("#", "").toLowerCase() === tag.replace("#", "").toLowerCase()){
          el.style.color= '#fff';
          el.style.backgroundColor  = '#000000';
        }
        else{
          el.style.color= '#000000';
          el.style.backgroundColor  = '#fff';
        }
      }
    });
  }
}