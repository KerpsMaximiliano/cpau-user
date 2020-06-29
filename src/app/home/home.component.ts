﻿import { Component, Injector, ViewEncapsulation } from "@angular/core";
import { User } from "@app/_models";
import { AuthenticationService, SiteLoader } from "@app/_services";
import { map } from "rxjs/operators";
import {
  ContentSite,
  DEAFULT_IMAGE,
} from "@app/shared/models/contentsite.model";
import { Events } from "@app/shared/Models/Events.model";
import { ExternalProduct } from "@app/shared/Models/ExternalProduct.model";
import { Router } from '@angular/router';

declare function recortarTituloPrincipal(text);
declare function recortarSummary(text);
declare function recortarTituloSecundario(text);

declare function recortarTituloProductoExterno(text);
declare function recortarHeaderProductoExterno(text);
declare function recortarDescriptionProductoExterno(text);

@Component({
  templateUrl: "home.component.html",
  styleUrls: ["home.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  loading = false;
  currentUser: User;
  userFromApi: User;
  contentSite: ContentSite;
  events: Events[];
  externalProduct: ExternalProduct[];
  constructor(
    private siteLoader: SiteLoader,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {

    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      
      if (urlParams && urlParams.has('redirectToPage')) {
        var redirectToPage = urlParams.get('redirectToPage');
        if (redirectToPage == '/passwordrecovery/confirm') {
          const params = window.location.hash;
          var paramsarray = params.split('&');
          const token = paramsarray[0].split('=')[1];
          const email = paramsarray[1].split('=')[1];
          this.router.navigate([redirectToPage], {queryParams: {'token': token, 'email' : email }});  
        } else {
          this.router.navigate([redirectToPage]);
        }
      }
    }


    const sectionName = "NOTICIAS";
    const cantMax = 4;

    this.siteLoader.bannerSubject.next({
      main: true,
      section: false,
      news: false,
    });
    this.siteLoader
      .getNews(sectionName, cantMax)
      .pipe(
        map((ret) => ret as ContentSite),
        map((ret) => {
          if (ret.items != undefined) {
            ret.items[0] != undefined && ret.items[0].title != undefined
              ? (ret.items[0].title = recortarTituloPrincipal(
                  ret.items[0].title
                ))
              : false;
            ret.items[0] != undefined && ret.items[0].summary != undefined
              ? (ret.items[0].summary = recortarSummary(ret.items[0].summary))
              : false;
            ret.items[1] != undefined && ret.items[1].title != undefined
              ? (ret.items[1].title = recortarTituloSecundario(
                  ret.items[1].title
                ))
              : false;
            ret.items[2] != undefined && ret.items[2].title != undefined
              ? (ret.items[2].title = recortarTituloSecundario(
                  ret.items[2].title
                ))
              : false;
            ret.items[3] != undefined && ret.items[3].title != undefined
              ? (ret.items[3].title = recortarTituloSecundario(
                  ret.items[3].title
                ))
              : false;

            for (let index = 0; index < 4; index++) {
              if (
                !ret.items[index].image ||
                ret.items[index].image == null ||
                ret.items[index].image.imageUrl == ""
              )
                ret.items[index].image = { imageUrl: DEAFULT_IMAGE };
            }
          }

          return ret;
        })
      )
      .subscribe((data) => {
        this.contentSite = data;
      });

    this.siteLoader
      .getEvents()
      .pipe(map((ret) => ret as Events[]))
      .subscribe((data) => {
        this.events = data;
      });

    this.siteLoader
      .getExternalProducts()
      .pipe(
        map((ret) => ret as ExternalProduct[]),
        map((ret) => {
          if (ret != undefined) {
            ret[0] != undefined && ret[0].title != undefined
              ? (ret[0].title = recortarTituloProductoExterno(ret[0].title))
              : false;
            ret[1] != undefined && ret[1].title != undefined
              ? (ret[1].title = recortarTituloProductoExterno(ret[1].title))
              : false;
            ret[2] != undefined && ret[2].title != undefined
              ? (ret[2].title = recortarTituloProductoExterno(ret[2].title))
              : false;
            ret[3] != undefined && ret[3].title != undefined
              ? (ret[3].title = recortarTituloProductoExterno(ret[3].title))
              : false;

            ret[0] != undefined && ret[0].header != undefined
              ? (ret[0].header = recortarHeaderProductoExterno(ret[0].header))
              : false;
            ret[1] != undefined && ret[1].header != undefined
              ? (ret[1].header = recortarHeaderProductoExterno(ret[1].header))
              : false;
            ret[2] != undefined && ret[2].header != undefined
              ? (ret[2].header = recortarHeaderProductoExterno(ret[2].header))
              : false;
            ret[3] != undefined && ret[3].header != undefined
              ? (ret[3].header = recortarHeaderProductoExterno(ret[3].header))
              : false;

            ret[0] != undefined && ret[0].description != undefined
              ? (ret[0].description = recortarDescriptionProductoExterno(
                  ret[0].description
                ))
              : false;
            ret[1] != undefined && ret[1].description != undefined
              ? (ret[1].description = recortarDescriptionProductoExterno(
                  ret[1].description
                ))
              : false;
            ret[2] != undefined && ret[2].description != undefined
              ? (ret[2].description = recortarDescriptionProductoExterno(
                  ret[2].description
                ))
              : false;
            ret[3] != undefined && ret[3].description != undefined
              ? (ret[3].description = recortarDescriptionProductoExterno(
                  ret[3].description
                ))
              : false;
          }

          return ret;
        })
      )
      .subscribe((data) => {
        this.externalProduct = data;
      });

      //modal
      // document.getElementById("openModalButton").click();
  }
}
