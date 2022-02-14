import { Component, Inject, Injector, ViewChild, ViewEncapsulation } from "@angular/core";
import { User } from "@app/_models";
import { AuthenticationService, ModalHomeService, SiteLoader } from "@app/_services";
import { map } from "rxjs/operators";
import {
  ContentSite,
  ItemsSite,
  DEAFULT_IMAGE,
} from "@app/shared/models/contentsite.model";
import { Events } from "@app/shared/models/Events.model";
import { ExternalProduct } from "@app/shared/models/ExternalProduct.model";
import { Router } from '@angular/router';
import { ModalHome } from '@app/_models/modalHome.model';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlCarousel } from "ngx-owl-carousel";
import { stringify } from "querystring";
import { DOCUMENT } from "@angular/common";
declare var $: any;
declare function recortarTituloPrincipal(text);
declare function recortarSummary(text);
declare function recortarTituloSecundario(text);

declare function recortarTituloProductoExterno(text);
declare function recortarHeaderProductoExterno(text);
declare function recortarDescriptionProductoExterno(text);

@Component({
  templateUrl: "home.component.html",
  styleUrls: ["home.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  @ViewChild('owlElementHome', {static: false}) owlElement: OwlCarousel;
  loading = false;
  currentUser: User;
  userFromApi: User;
  contentSite: ItemsSite[];
  events: Events[];
  externalProduct: ExternalProduct[];
  noticiasCarrousel: ExternalProduct[];
  modalContent: ModalHome;
  load: boolean;
  SlideOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    nav: false,
    items: 4,
    lazyLoad: true,
    autoplay: true,
    responsive: {
      0: {
          items: 1,
          nav: false
      },
      400: {
        items: 1,
        nav: false
      },
      600: {
          items: 2,
          nav: false
      },
      1000: {
          items: 4,
          nav: false,
      }
    }
  };
  constructor(
    private siteLoader: SiteLoader,
    private authenticationService: AuthenticationService,
    private modalHomeService: ModalHomeService,
    private router: Router,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) readonly document: Document
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {

    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(queryString);

      if (urlParams && urlParams.has('redirectToPage')) {
        var redirectToPage = urlParams.get('redirectToPage');
        if (redirectToPage == '/passwordrecovery/confirm') {
          const params = window.location.hash;
          var paramsarray = params.split('&');
          const token = paramsarray[0].split('=')[1];
          const email = paramsarray[1].split('=')[1];
          this.router.navigate([redirectToPage], { queryParams: { 'token': token, 'email': email } });
        } else {
          this.router.navigate([redirectToPage]);
        }
      }
    }


    const sectionName = "NOTICIAS";
    const cantMax = 7;

    this.siteLoader.bannerSubject.next({
      main: true,
      section: false,
      news: false,
    });
    this.siteLoader
      .getNews()
      .pipe(
        map((ret) => ret as ItemsSite[]),
        map((ret) => {
          if (ret != undefined) {
            ret[0] != undefined && ret[0].title != undefined
              ? (ret[0].title = recortarTituloPrincipal(
                ret[0].title
              ))
              : false;
            ret[0] != undefined && ret[0].summary != undefined
              ? (ret[0].summary = recortarSummary(ret[0].summary))
              : false;

            for (let ind = 1; ind < 7; ind++) {
              ret[ind] != undefined && ret[ind].title != undefined
                ? (ret[ind].title = recortarTituloSecundario(
                  ret[ind].title
                ))
                : false;
                if (!ret[ind].image ||
                  ret[ind].image == null ||
                  ret[ind].image.imageUrl === ''
                ) {
                  ret[ind].image = { imageUrl: DEAFULT_IMAGE };
                }
            }
            
          }

          return ret;
        })
      )
      .subscribe((data) => {
        this.contentSite = data;
      });

    this.siteLoader
      .getEvents()
      .pipe(map((ret) => ret as Events[]))
      .subscribe((data) => {
        this.events = data;
      });

      this.siteLoader
      .getNoticiasCarrousel()
      .pipe(
        map((ret) => ret as ExternalProduct[]),
        map((ret) => {
          if (ret !== undefined) {
            ret.forEach(r => {
              r.title = r.title !== undefined ? recortarTituloProductoExterno(r.title) : undefined;
              r.header = r.header !== undefined ? recortarHeaderProductoExterno(r.header) : undefined;
              r.description = r.description !== undefined ? recortarDescriptionProductoExterno(r.description) : undefined;
            });
          }

          return ret;
        })
      )
      .subscribe((data) => {
        this.noticiasCarrousel = data;
      });

    this.siteLoader
      .getExternalProducts()
      .pipe(
        map((ret) => ret as ExternalProduct[]),
        map((ret) => {
          if (ret !== undefined) {
            ret.forEach(r => {
              r.title = r.title !== undefined ? recortarTituloProductoExterno(r.title) : undefined;
              r.header = r.header !== undefined ? recortarHeaderProductoExterno(r.header) : undefined;
              r.description = r.description !== undefined ? recortarDescriptionProductoExterno(r.description) : undefined;
            });
          }

          return ret;
        })
      )
      .subscribe((data) => {
        this.externalProduct = data;
      });

    // modal

    this.modalHomeService.getTodayModal().pipe(
      map(x => x.data)
    ).subscribe(modal => {

      if (modal && modal.content) {
        this.modalContent = {
          title: modal.title,
          content: this.sanitizer.bypassSecurityTrustHtml(modal.content as string)
        };
        document.getElementById('openModalButton').click();
      }
    });

    $("video[autoplay]").each(function(){ this.play(); });
  }

// touch

  selectTarget(index){
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

  messagesRendered(isLast: boolean) {
    if (isLast && !this.load) {
      this.carrousel();
    }
  }

  redirectUrl(cs : ContentSite) {
    if (cs.link && cs.link.trim() != ''){
      this.redirect(cs.link);
    } else {
      this.router.navigateByUrl("/nota/" + cs.id);
    }
  }

  get window(): Window { return this.document.defaultView; }

  redirect(url: string, target: string = '_blank'): Promise<boolean> {

    return new Promise<boolean>( (resolve, reject) => {
  
        try { resolve(!!this.window.open(url, target)); }
        catch(e) { reject(e); }
    });
  }

  carrousel() {
    this.load = true;
    const epowl = $('#epCarrousel');
    epowl.owlCarousel({
        loop: this.externalProduct && this.externalProduct.length > 4,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 1000,
        nav: false,
        items: 4,
        lazyLoad: true,
        autoplay: true,
        responsive: {
          0: {
              items: 1,
              nav: false
          },
          400: {
            items: 2,
            nav: false
          },
          1000: {
              items: 4,
              nav: false,
          }
        }
    });
    const ncowl = $('#ncCarrousel');
    ncowl.owlCarousel({
        loop: this.noticiasCarrousel && this.noticiasCarrousel.length > 4,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 1000,
        nav: false,
        items: 4,
        lazyLoad: true,
        autoplay: true,
        responsive: {
          0: {
              items: 1,
              nav: false
          },
          400: {
            items: 2,
            nav: false
          },
          1000: {
              items: 4,
              nav: false,
          }
        }
    });
    this.SlideOptions.items = 4;
    this.SlideOptions.loop = this.externalProduct.length > 4;
    this.SlideOptions.responsive = {
      0: {
          items: 1,
          nav: false
      },
      400: {
        items: 1,
        nav: false
      },
      600: {
          items: 2,
          nav: false
      },
      1000: {
          items: 4,
          nav: false,
      }
    };
  }
}
