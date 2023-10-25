import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

// * Services.
import { SiteLoader } from "@app/_services";
import { BusquedaService } from "@app/_services/busqueda.service";

@Component({
  selector: "app-button-home",
  templateUrl: "./button-home.component.html",
  styleUrls: ["./button-home.component.css"],
})
export class ButtonHomeComponent implements OnInit {
  servicios: any[] = [];
  formacion: any[] = [];
  ejercicioprofesional: any[] = [];
  prodExternos: any[] = [];
  consejo: any[] = [];
  keyword = "title";
  resultSearch: any;
  private search: string;

  constructor(
    private _busqueda: BusquedaService,
    private siteLoader: SiteLoader,
    private activedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.siteLoader.GetSectionMenu().subscribe((x) => {
      x.forEach((e) => {
        switch (e.parentSeName) {
          case "/el-consejo":
            this.consejo.push(e);
            break;
          case "/formacion":
            this.formacion.push(e);
            break;
          case "/servicios":
            this.servicios.push(e);
            break;
          case "/ejercicio-profesional":
            this.ejercicioprofesional.push(e);
            break;
          default:
            break;
        }
      });
    });

    interface MenuItem {
      header: string;
      description: string;
      orden: number;
      title: string;
      url: string;
      linkTarget: number;
    }

    this.siteLoader.GetMenusExtProd().subscribe((data: MenuItem[]) => {
      this.prodExternos = data.map((item) => {
        item.url = this.cleanURL(item.url);
        return item;
      });
    });
  }

  public configFilter(keyword: string): void {
    if (keyword.length < 4 || this._busqueda.get() === keyword) return;

    this._busqueda.emit(keyword);

    let route = this.activedRoute.snapshot.url
      .map((segment) => segment.path)
      .join("/");
    if (route !== "busqueda") this.router.navigate(["/busqueda"]);
  }

  private cleanURL(url: string): string {
    url = url.replace(/%2F/g, "/");

    if (url.indexOf("https://") === 0)
      url = `https://${url.slice(7).replace(/\/\/+/g, "/")}`;

    if (url.indexOf("http://") === 0)
      url = `http://${url.slice(6).replace(/\/\/+/g, "/")}`;

    return url;
  }

  selectEvent(item) {
    this.router.navigate(["/nota/" + item.sectionContentId]);
  }

  selectTarget(index) {
    let target = "";
    switch (index) {
      case 0:
        target = "_self";
        break;
      case 1:
        target = "_blank";
        break;
      case 2:
        target = "_parent";
        break;
      case 3:
        target = "_top";
        break;
      case 4:
        target = "_search";
        break;
      default:
        break;
    }
    return target;
  }
}
