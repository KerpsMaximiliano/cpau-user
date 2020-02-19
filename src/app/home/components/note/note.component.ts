import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SiteLoader } from '@app/_services';
import { map } from 'rxjs/operators';
import { ContentSite } from '@app/shared/models/contentsite.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  data: ContentSite;
  constructor(private _router: Router,private _Activatedroute:ActivatedRoute, private siteLoader: SiteLoader) { }

  ngOnInit() {
    this._router.events.subscribe(res => {
      if (res instanceof NavigationEnd)
      {
        const id = this._Activatedroute.snapshot.paramMap.get("id");
        this.loadContent(id);
      }
    });

    const id = this._Activatedroute.snapshot.paramMap.get("id");
    this.loadContent(id);
  }

  loadContent(id) {
    this.siteLoader.getFullContent(id)
    .pipe(
      map(ret => ret as ContentSite),
    )
    .subscribe( content => {
      this.data = content;
    });

  }

}
