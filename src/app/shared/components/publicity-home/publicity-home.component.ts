import { Component, ElementRef, OnInit } from '@angular/core';
import { SiteLoader } from '@app/_services';
declare var $: any;
// import * as jQuery from 'jquery';
// window['$'] = jQuery;
// import * as $ from 'jquery'; window["$"] = $; window["jQuery"] = $;

@Component({
  selector: 'app-publicity-home',
  templateUrl: './publicity-home.component.html',
  styleUrls: ['./publicity-home.component.css']
})
export class PublicityHomeComponent implements OnInit {
  banners: any = [];

  constructor(private siteLoad: SiteLoader,
              private el: ElementRef) {
                $(this.el.nativeElement).on('slide.bs.carousel', (e: any) =>  {
                  const $e = $(e.relatedTarget);
                  const idx = $e.index();
                  const itemsPerSlide = 4;
                  const totalItems = $('.carousel-item').length;

                  if (totalItems > itemsPerSlide) {
                      const it = itemsPerSlide - (totalItems - idx);
                      for (let i = 0; i < it; i++) {
                          // append slides to end
                          if (e.direction === 'left') {
                              $('.carousel-item').eq(i).appendTo('.carousel-inner');
                          } else {
                              $('.carousel-item').eq(0).appendTo('.carousel-inner');
                          }
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
          }
        );
      }
      )
      ).unsubscribe();
    }
}
