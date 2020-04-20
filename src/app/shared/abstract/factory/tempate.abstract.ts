import { SiteLoader } from '@app/_services';
import { Observable } from 'rxjs';
import { AddTemplate } from '@app/shared/models/add-template';
import { TemplateOneComponent } from '@app/home/components/templates/template-one/template-one.component';
import { TemplateTwoComponent } from '@app/home/components/templates/template-two/template-two.component';
import { TemplateThreeComponent } from '@app/home/components/templates/template-three/template-three.component';
import { TemplateListComponent } from '@app/home/components/templates/template-list/template-list.component';
import { TemplateFourComponent } from '@app/home/components/templates/template-four/template-four.component';
import { TemplateFiveComponent } from '@app/home/components/templates/template-five/template-five.component';

// AbstractFactoryInterface
export interface ITemplate {
  get(sectionName): Observable<any>;
}
// AbstractFactoryProvider as a HashMap
export const templateServiceMap = new Map([
  [1, new AddTemplate(TemplateOneComponent, SiteLoader)], //templateOne
  [2, new AddTemplate(TemplateTwoComponent, SiteLoader)], //templateTwo
  [3, new AddTemplate(TemplateThreeComponent, SiteLoader)], //templateThree
  [0, new AddTemplate(TemplateListComponent, SiteLoader)],
  [4, new AddTemplate(TemplateFourComponent, SiteLoader)],
  [5, new AddTemplate(TemplateFiveComponent, SiteLoader)],

    //templateThree
]);