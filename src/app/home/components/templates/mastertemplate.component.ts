import { Component, OnInit, Input, Injector, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { TemplateWrapper } from '@app/shared/interface/template.wrapper';
import { templateServiceMap } from '@app/shared/abstract/factory/tempate.abstract';
import { RenderDirective } from '@app/_directive/renderhost.directive';
import { SiteLoader } from '@app/_services';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { ContentSite } from '@app/shared/models/contentsite.model';

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
export class MastertemplateComponent implements OnInit {
  sectionName: string;
  @ViewChild(RenderDirective, {static: true}) renderHost: RenderDirective;

  constructor(private _Activatedroute:ActivatedRoute,private route: ActivatedRoute, private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver, private siteLoader: SiteLoader) { }

  ngOnInit() {
    this.siteLoader.bannerSubject.next({main: false, section: true, news: false});
    this.route.url.subscribe(url => {
      this.getData();
      this.loadComponent();
    });

    this.loadComponent();
  }

  private getData(){
    const section = this._Activatedroute.snapshot.paramMap.get("namesection");
    this.sectionName = section;
  }

  private loadComponent() {

    this.siteLoader.getSectionBySeName(this.sectionName).subscribe( section =>{
      
      if (section == null) {
        this.sectionName = "rutainvalida";
        this.loadComponent();
      }
      
      //Resolve AbstractFactory
      const injectable = templateServiceMap.get(section.templateId);
      // Inject service
      const service = this.injector.get(injectable.service);
      // Calling method implemented by the correct interface
      service.get(this.sectionName)
      .pipe(
        map(ret => ret as ContentSite),
      ).subscribe(data => {
        // if(data.childLists.length > 0) {
        //   const injectable = templateServiceMap.get(0);
        //   this.setDataInComponet(injectable.component, data);
        // } else{
          this.setDataInComponet(injectable.component, data);
        // }
       })
    });
  }

  private setDataInComponet(component, data){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const viewContainerRef = this.renderHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<TemplateWrapper>componentRef.instance).data = data;
  }
}
