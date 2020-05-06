import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SiteLoader } from '@app/_services';
import { map } from 'rxjs/operators';
import { ContentSite, BreadCrumb } from '@app/shared/models/contentsite.model';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare function scrollup();



@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NoteComponent implements OnInit {

  breadCrumb:BreadCrumb[];

  data: ContentSite;
  constructor(private _router: Router,private _Activatedroute:ActivatedRoute, private siteLoader: SiteLoader,private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
    ) { }

  ngOnInit() {
    const s = this.renderer2.createElement('script');
    s.onload = this.loadNextScript.bind(this);
    s.type = 'text/javascript';
    s.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5cfa8097b7056b7c';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);

    this._router.events.subscribe(res => {
      if (res instanceof NavigationEnd)
      {
        const id = this._Activatedroute.snapshot.paramMap.get("id");
        this.loadContent(id);
      }
    });

    const id = this._Activatedroute.snapshot.paramMap.get("id");
    this.loadContent(id);
    scrollup();
  }

  loadNextScript() {
    const s = this.renderer2.createElement('script');
    s.text = ``
    this.renderer2.appendChild(this._document.body, s);
    }

  loadContent(id) {
    this.siteLoader.bannerSubject.next({main: false, section: true, news: false});
    this.siteLoader.getFullContent(id)
    .pipe(
      map(ret => ret as ContentSite),
    )
    .subscribe( content => {
      this.data = content;
      this.breadCrumb = this.data.breadCrumb;
    });

  }

}
