import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { User } from '@app/_models';
import { AuthenticationService, SiteLoader } from '@app/_services';
import { map } from 'rxjs/operators';
import { ContentSite } from '@app/shared/models/contentsite.model';
import { Events } from '@app/shared/Models/Events.model';
import { ExternalProduct } from '@app/shared/Models/ExternalProduct.model';

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

        this.siteLoader.getNews(sectionName,cantMax)
        .pipe(
            map(ret => ret as ContentSite),
            map(ret => {
                    ret.items.forEach(i=> i.summary != null && i.summary != undefined
                        ? i.summary = (i.summary.length > 265 ? i.summary.substr(0,265)+'...<a href="#">ver más</a>' : i.summary )
                        : i.summary = ''
                        );
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