import { Component, OnInit, ViewChild } from '@angular/core';
import { SiteLoader } from '@app/_services';
import { OwlCarousel } from 'ngx-owl-carousel';
declare var $: any;
@Component({
  selector: 'app-publicity-home',
  templateUrl: './publicity-home.component.html',
  styleUrls: ['./publicity-home.component.css']
})
export class PublicityHomeComponent implements OnInit {
  @ViewChild('owlElement', {static: false}) owlElement: OwlCarousel;
  banners: any[] = [];
  load: boolean;
  SlideOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    nav: false,
    items: 4,
    lazyLoad: true,
    autoplay: true
  };

  constructor(private siteLoad: SiteLoader) {

  }

  messagesRendered(isLast: boolean) {
    if (isLast && !this.load) {
      this.carrousel();
    }
  }

  carrousel() {
    this.load = true;
    const owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 1000,
        nav: false,
        items: this.banners.length < 5 ? this.banners.length : 4,
        lazyLoad: true,
        autoplay: true,
        responsive: {
          0: {
              items: 1,
              nav: false
          },
          600: {
              items: 3,
              nav: false
          },
          1000: {
              items: this.banners.length < 5 ? this.banners.length : 4,
              nav: false,
          }
        }
    });
  }

  ngOnInit() {
      this.siteLoad.bannerSubject.subscribe(data =>
       this.siteLoad.getBanners(data.main, data.section, data.news)
       .subscribe(ret => {
        this.banners = ret
          .filter(x => {
              if(data.main && x.isMainPage) 
                  return x;

              if(data.section && x.isSection)
                  return x;

              if(data.news && x.isNewsletter)
                  return x;
          });
      }
      )
      ).unsubscribe();
    }
}
