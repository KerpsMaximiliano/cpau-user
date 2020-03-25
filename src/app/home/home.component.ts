import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { User } from '@app/_models';
import { AuthenticationService, SiteLoader } from '@app/_services';
import { map } from 'rxjs/operators';
import { ContentSite } from '@app/shared/models/contentsite.model';
import { Events } from '@app/shared/Models/Events.model';
import { ExternalProduct } from '@app/shared/Models/ExternalProduct.model';

declare function recortarTituloPrincipal(text);
declare function recortarSummary(text);
declare function recortarTituloSecundario(text);

@Component(
    {
        templateUrl: 'home.component.html' ,
        styleUrls: ['home.component.css'],
        encapsulation: ViewEncapsulation.None
    })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    contentSite: ContentSite;
    events: Events[];
    externalProduct: ExternalProduct[];

    constructor(
        private siteLoader: SiteLoader,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {


        const sectionName = "NOTICIAS";
        const cantMax = 4;

        this.siteLoader.bannerSubject.next({main: true, section: false, news: false});
        this.siteLoader.getNews(sectionName,cantMax)
        .pipe(
            map(ret => ret as ContentSite),
            map(ret => {
                if (ret.items != undefined){
                    ret.items[0] != undefined && ret.items[0].title != undefined ? ret.items[0].title = recortarTituloPrincipal(ret.items[0].title) : false;
                    ret.items[0] != undefined && ret.items[0].summary != undefined ? ret.items[0].summary = recortarSummary(ret.items[0].summary) : false;
                    ret.items[1] != undefined && ret.items[1].title != undefined ? ret.items[1].title = recortarTituloSecundario(ret.items[1].title) : false;
                    ret.items[2] != undefined && ret.items[2].title != undefined ? ret.items[2].title = recortarTituloSecundario(ret.items[2].title): false;
                    ret.items[3] != undefined && ret.items[3].title != undefined ? ret.items[3].title = recortarTituloSecundario(ret.items[3].title): false;
                }

                return ret;
            })
            )
        .subscribe(data => {
            this.contentSite = data;
        });

        this.siteLoader.getEvents()
        .pipe(map(ret => ret as Events[]))
        .subscribe(data => {
            this.events = data;
        });

        this.siteLoader.getExternalProducts()
        .pipe(map(ret => ret as ExternalProduct[]))
        .subscribe(data => {
            this.externalProduct = data;
        });

        
    }

}