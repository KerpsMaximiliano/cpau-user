import { Component, OnInit, Input } from '@angular/core';
import { TemplateWrapper } from '@app/shared/interface/template.wrapper';
import { ContentSite } from '@app/shared/models/contentsite.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit , TemplateWrapper {
  @Input() data: ContentSite;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
