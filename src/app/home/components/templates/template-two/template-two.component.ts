import { Component, OnInit, Input } from '@angular/core';
import { TemplateWrapper } from '@app/shared/interface/template.wrapper';
import { ContentSite, ItemsSite } from '@app/shared/models/contentsite.model';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.css']
})
export class TemplateTwoComponent implements OnInit, TemplateWrapper {

  @Input() public data: ContentSite;
  dataOld: ContentSite;
  destacado: ItemsSite[];
  noDestacado: ItemsSite[];

  constructor() { }

  ngOnInit() {
    console.log(this.data)
    this.dataOld = Object.assign({}, this.data);
    this.destacado = this.data.items.filter(x=> x.highlighted)
    this.noDestacado = this.data.items.filter(x=> !x.highlighted)
  }

  onSelectTag(tag) {
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
}
