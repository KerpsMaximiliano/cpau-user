import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { SiteLoader } from '@app/_services';

declare function triggerCarousel() : any ;

@Component({
  selector: 'app-publicity-home',
  templateUrl: './publicity-home.component.html',
  styleUrls: ['./publicity-home.component.css']
})
export class PublicityHomeComponent implements OnInit {
  banners: any;

  constructor(private siteLoad:SiteLoader) { }

    ngOnInit() {
      this.siteLoad.bannerSubject.subscribe(data =>
       this.siteLoad.getBanners(data.main, data.section, data.news)
       .subscribe(ret =>
          this.banners = ret.filter(x => {
              if(data.main && x.isMainPage)
                  return x;

              if(data.section && x.isSection)
                  return x;

              if(data.news && x.isNewsletter)
                  return x;
          })
        )
      ).unsubscribe();

      triggerCarousel();
    }
}
