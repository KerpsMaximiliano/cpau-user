import { Component, OnInit } from '@angular/core';
import { SiteLoader } from '@app/_services';
declare var $: any;

@Component({
  selector: 'app-publicity-home',
  templateUrl: './publicity-home.component.html',
  styleUrls: ['./publicity-home.component.css']
})
export class PublicityHomeComponent implements OnInit {
  banners: any = [];
  load: boolean;

  constructor(private siteLoad: SiteLoader) {
  }

  /* Helpers */
  messagesRendered(isLast: boolean) {
    if (isLast && !this.load) {
      this.carrousel();
    }
  }

  carrousel() {
    this.load = true;
    $('#myCarousel').carousel( {
      interval: 6000
    });

    $('.carousel .item').each(function(){
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      for (var i=0;i<2;i++) {
        next=next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        
        next.children(':first-child').clone().appendTo($(this));
      }
    });

    $('#myCarousel').bind('slide.bs.carousel', function(e) {

      var $e = $(e.currentTarget);
      var totalItems = $('.carousel .item').length - 1;
      var $indicators = $e.find('.carousel-inner');

      var $item = $(e.relatedTarget);
      
      var active = $e.find('.active');
      var itemIndex = active.index();
      
      active.removeClass('active');
      $indicators.children().eq(itemIndex < totalItems ? itemIndex + 1: 0).addClass('active');

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