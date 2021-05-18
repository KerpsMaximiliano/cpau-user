import { Component, OnInit, ViewChild } from '@angular/core';
import { SiteLoader } from '@app/_services';
import { OwlCarousel } from 'ngx-owl-carousel';


@Component({
  selector: 'app-publicity-home',
  templateUrl: './publicity-home.component.html',
  styleUrls: ['./publicity-home.component.css']
})
export class PublicityHomeComponent implements OnInit {
  @ViewChild('owlElement', {static: false}) owlElement: OwlCarousel;
  banners: any = [];
  load: boolean;
  //SlideOptions = { items: 4, dots: false, nav: false, navSpeed: 700, loop: true, };
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
  // CarouselOptions = { items: 4, dots: true, nav: true };

  constructor(private siteLoad: SiteLoader) {

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