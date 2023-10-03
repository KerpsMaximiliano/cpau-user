import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  EventEmitter,
  Output,
  AfterViewInit,
} from "@angular/core";
import { TemplateWrapper } from "@app/shared/interface/template.wrapper";
import {
  ContentSite,
  ItemsSite,
  BreadCrumb,
} from "@app/shared/models/contentsite.model";

declare function recortarTituloListadoTemplateFour(text);
declare function recortarSummaryListadoTemplateFour(text);

@Component({
  selector: "app-template-five",
  templateUrl: "./template-five.component.html",
  styleUrls: ["./template-five.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class TemplateFiveComponent
  implements OnInit, TemplateWrapper, AfterViewInit
{
  @Input() public data: ContentSite;
  @Output() changeComponent: EventEmitter<any> = new EventEmitter<any>();
  dataOld: ContentSite;
  destacado: ItemsSite[];
  noDestacado: ItemsSite[];
  breadCrumb: BreadCrumb[];

  constructor() {}

  ngAfterViewInit(): void {
    this.resetStyeTags(localStorage.getItem("tagSelected"));
  }

  ngOnInit() {
    if (this.data.items) {
      this.data.items.forEach((e) => {
        if (e.link) e.link = this.cleanURL(e.link);
      });
    }
    localStorage.setItem("tagSelected", this.data.filterApply);
    this.dataOld = Object.assign({}, this.data);
    this.breadCrumb = this.dataOld.breadCrumb;
    this.destacado = this.data.items.filter((x) => x.highlighted);
    this.noDestacado = this.data.items.filter((x) => !x.highlighted);

    this.noDestacado.forEach((nota) => {
      nota.title = recortarTituloListadoTemplateFour(nota.title);
      nota.summary = recortarSummaryListadoTemplateFour(nota.summary);
    });

    this.resetStyeTags(localStorage.getItem("tagSelected"));
  }

  private cleanURL(url: string): string {
    url = url.replace(/%2F/g, "/");

    if (url.indexOf("https://") === 0)
      url = `https://${url.slice(7).replace(/\/\/+/g, "/")}`;

    if (url.indexOf("http://") === 0)
      url = `http://${url.slice(6).replace(/\/\/+/g, "/")}`;

    return url;
  }

  onSelectTag(tag) {
    localStorage.setItem("tagSelected", tag);
    this.resetStyeTags(tag);
    this.changeComponent.emit(tag);
  }

  private resetStyeTags(tag) {
    document.getElementsByName("categories").forEach((element) => {
      const el = document.getElementById("lbl" + element.id.replace("#", ""));

      if (el) {
        if (
          element.id.replace("#", "").toLowerCase() ===
          tag.replace("#", "").toLowerCase()
        ) {
          el.style.color = "#fff";
          el.style.backgroundColor = "#000000";
        } else {
          el.style.color = "#000000";
          el.style.backgroundColor = "#fff";
        }
      }
    });
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
