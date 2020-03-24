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
                if (ret.items != undefined){
                    ret.items[0] != undefined && ret.items[0].title != undefined ? ret.items[0].title = $.fn.recortarTituloPrincipal(ret.items[0].title) : false;
                    ret.items[0] != undefined && ret.items[0].summary != undefined ? ret.items[0].summary = $.fn.recortarSummary(ret.items[0].summary) : false;
                    ret.items[1] != undefined && ret.items[1].title != undefined ? ret.items[1].title = $.fn.recortarTituloSecundario(ret.items[1].title) : false;
                    ret.items[2] != undefined && ret.items[2].title != undefined ? ret.items[2].title = $.fn.recortarTituloSecundario(ret.items[2].title): false;
                    ret.items[3] != undefined && ret.items[3].title != undefined ? ret.items[3].title = $.fn.recortarTituloSecundario(ret.items[3].title): false;
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

        $.fn.textWidth = function(text, font) {
            if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
            $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
            return $.fn.textWidth.fakeEl.width();
        };
        
        $.fn.recortar = function(text, font, lineWidth) {
            var size = $.fn.textWidth(text, font);
            var retext = text;
            var recortar = size > lineWidth;
            while (size > lineWidth) {
                text = text.toString().substr(0,text.length-1);
                size = $.fn.textWidth(text, font);
            }
            
            if (recortar) {
                text = text.toString().substr(0,text.length-5);
                text = text + '...'
            }
            
            return text;
            
        };

        $.fn.recortarTituloPrincipal = function(text) {
            return $.fn.recortar(text, '23pt Roboto', 990);
        }

        $.fn.recortarTituloSecundario = function(text) {
            return $.fn.recortar(text, '15pt Roboto', 890);
        }

        $.fn.recortarSummary = function(text) {
            return $.fn.recortar(text, '12pt Roboto', 1800);
        }

    }

}