import { Component, OnInit, Input, Injector, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { TemplateWrapper } from '@app/shared/interface/template.wrapper';
import { templateServiceMap } from '@app/shared/abstract/factory/tempate.abstract';
import { RenderDirective } from '@app/_directive/renderhost.directive';
import { SiteLoader } from '@app/_services';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { ContentSite } from '@app/shared/models/contentsite.model';
import { AddTemplate } from '@app/shared/models/add-template';

@Component({
  selector: 'app-mastertemplate',
  template: `
    <body>
      <!--CONTENEDOR-->
      <div class="container pt-4">
          <app-header-home></app-header-home>
          <app-button-home></app-button-home>

            <div class="row" >
              <!--Title-->
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">

                  <ng-template render-host></ng-template>

                </div>
              <!--Title:fin-->
            </div>

          <app-publicity-home></app-publicity-home>
          <app-footer></app-footer>
      </div>
      <!--CONTENEDOR: FIN	-->
    </body>`
})
export class MastertemplateComponent implements OnInit, OnDestroy {
  sectionName: string;
  injectable: AddTemplate;
  service: any;
  @ViewChild(RenderDirective, {static: true}) renderHost: RenderDirective;

  constructor(private _Activatedroute:ActivatedRoute,private route: ActivatedRoute, private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver, private siteLoader: SiteLoader) { }

  ngOnDestroy(): void {
    localStorage.setItem('tagSelected', null);
  }

  ngOnInit() {
    this.siteLoader.bannerSubject.next({main: false, section: true, news: false});
    this.route.url.subscribe(url => {
      this.getData();
      this.loadComponent();
    });

    this.loadComponent();
  }

  private getData() {
    const section = this._Activatedroute.snapshot.paramMap.get("namesection");
    this.sectionName = section;
  }

  private loadComponent() {

    this.siteLoader.getSectionBySeName(this.sectionName).subscribe( section => {

      if (section == null) {
        this.sectionName = "rutainvalida";
        this.loadComponent();
      }
      // Resolve AbstractFactory
      this.injectable = templateServiceMap.get(section.templateId);
      // Inject service
      this.service = this.injector.get(this.injectable.service);
      this.onChanges();
    });
  }

  private setDataInComponet(component, data) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const viewContainerRef = this.renderHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<TemplateWrapper>componentRef.instance).data = data;

        (<TemplateWrapper>componentRef.instance).changeComponent.subscribe(val => this.onChanges(val));
  }

  onChangeComponent() {
    //
  }
  onChanges(tag?: string) {
      // Calling method implemented by the correct interface
      this.service.get(this.sectionName, tag ? tag.replace('#', '') : tag)
      .pipe(
        map(ret => ret as ContentSite),
      ).subscribe(data => {
          this.setDataInComponet(this.injectable.component, data);
      });
  }
}
