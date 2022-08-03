import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SiteLoader } from '@app/_services';
import { map } from 'rxjs/operators';
import { ContentSite, BreadCrumb, Image } from '@app/shared/models/contentsite.model';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NoteComponent implements OnInit {

  imagenesGaleria:Image[];
  breadCrumb:BreadCrumb[];
  private fragment: string;

  data: ContentSite;
  constructor(private _router: Router,private _Activatedroute:ActivatedRoute, private siteLoader: SiteLoader,private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
    private titleService: Title
    ) { }

  ancla(): void {
    try {
      const element = document.getElementById( this.fragment);
      if (element) { element.scrollIntoView(true); }
    } catch (e) { }
  }

  acordeon(): void {
    try {
      const element = document.getElementById(window.location.hash.replace("#", '') + 'Button');
      if (element) { element.click(); }
    } catch (e) { }
  }

  popup(): void {
    try {
      const params = new URLSearchParams(window.location.search)
      if (params.has('modal')){
        document.getElementById(params.get('modal')).click();
      }
    } catch (e) { }
  }


  ngOnInit() {
    this.reload();
    const s = this.renderer2.createElement('script');
    s.onload = this.loadNextScript.bind(this);
    s.type = 'text/javascript';
    s.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5cfa8097b7056b7c';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);

    this._router.events.subscribe(res => {
      if (res instanceof NavigationEnd)
      {
        //const id = this._Activatedroute.snapshot.paramMap.get("id");
        //this.loadContent(id);
      }
    });

    this._Activatedroute.fragment.subscribe(fragment => { this.fragment = fragment; });

    const id = this._Activatedroute.snapshot.paramMap.get("id");
    this.loadContent(id);
  }

  loadNextScript() {
    const s = this.renderer2.createElement('script');
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);
  }

  loadContent(id) {
    this.siteLoader.bannerSubject.next({main: false, section: true, news: false});
    this.siteLoader.getFullContent(id)
    .pipe(
      map(ret => ret as ContentSite),
    )
    .subscribe( content => {
      //this.checkLightbox(content.content.text);
      this.data = content;
      this.imagenesGaleria = content.content.imagenesGaleria;
      this.titleService.setTitle(`${this.data.content.title} | CPAU`);
      this.breadCrumb = this.data.breadCrumb;
      setTimeout(() => {
        this.ancla();
      }, 10);
      setTimeout(() => {
        this.acordeon();
      }, 20);
      setTimeout(() => {
        this.popup();
      }, 30);
      setTimeout(() => {
        this.ancla();
      }, 40);
    });

  }

  top() {
    window.scroll(0, 0);
  }

  checkLightbox(text: string) {
    if(text.search("lightbox") == -1) {
      return;
    } else {
      let noteLightbox = sessionStorage.getItem("noteLightbox");
      if(noteLightbox == null) {
        sessionStorage.setItem("noteLightbox", 'loaded');
        window.location.reload();
      } else {
        sessionStorage.removeItem("noteLightbox")
      }
    }
  }

  reload() {
    let noteLightbox = sessionStorage.getItem("noteLightbox");
      if(noteLightbox == null) {
        sessionStorage.setItem("noteLightbox", 'loaded');
        window.location.reload();
      } else {
        sessionStorage.removeItem("noteLightbox")
      }
  }
}
