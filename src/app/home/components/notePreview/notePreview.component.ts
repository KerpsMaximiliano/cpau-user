import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SiteLoader } from '@app/_services';
import { map } from 'rxjs/operators';
import { ContentSite } from '@app/shared/models/contentsite.model';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Title} from "@angular/platform-browser";

declare function scrollup();

@Component({
  selector: 'app-note-preview',
  templateUrl: './notePreview.component.html',
  styleUrls: ['./notePreview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotePreviewComponent implements OnInit {
  data: ContentSite;
  private fragment: string;

  constructor(private _router: Router,private _Activatedroute:ActivatedRoute, private siteLoader: SiteLoader,private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
    private titleService: Title
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

    this._Activatedroute.fragment.subscribe(fragment => { this.fragment = fragment; });

    const id = this._Activatedroute.snapshot.paramMap.get("id");
    this.loadContent(id);
    // scrollup();
  }

  ancla(): void {
    try {
      const element = document.getElementById( this.fragment);
      if (element) { element.scrollIntoView(true); }
    } catch (e) { }
  }

  loadNextScript() {
    const s = this.renderer2.createElement('script');
    s.text = ``
    this.renderer2.appendChild(this._document.body, s);
    }

  loadContent(id) {
    this.siteLoader.getFullContentPreview(id)
    .pipe(
      map(ret => ret as ContentSite),
    )
    .subscribe( content => {
      this.data = content;
      this.titleService.setTitle(`${this.data.content.title} | CPAU`);
      setTimeout(() => {
        this.ancla();
      }, 10);
    });

  }

  top() {
    window.scroll(0, 0);
  }

}
