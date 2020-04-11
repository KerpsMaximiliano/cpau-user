import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { parse } from 'querystring';

@Pipe({name: 'safeHtml'})
export class Safe {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {

    let parser: DOMParser  = new DOMParser();
    let html: Document = parser.parseFromString(style, 'text/html');

    var newstyle = style;

    if (html.links) {
      var i = 0;
      for (i; i<html.links.length;i++) {
        var link = html.links[i];
        if (link.hash){
          var linkhash = 'href="' + link.hash + '"';
          var jsfunction = linkhash + " onclick=\"document.getElementById(\'" + link.hash.replace('#', '') + "').scrollIntoView(); return false;\"";
          newstyle = newstyle.replace(new RegExp(linkhash, "g"), jsfunction);
        }
      }
      var e = 3;
    }

    return this.sanitizer.bypassSecurityTrustHtml(newstyle);
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}