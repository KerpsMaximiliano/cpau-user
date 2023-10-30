import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// * Services.
import { BusquedaService } from "@app/_services/busqueda.service";

// * Interfaces.
export interface IResultado {
  contentId: number;
  sectionContentId: number;
  title: string;
  summary: string;
  breadCrumb: BreadCrumb[];
}

export interface BreadCrumb {
  name: string;
  link: string;
}

declare function recortarSummaryListadoTemplateFour(text: string): string;

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styleUrls: ["./busqueda.component.css"],
})
export class BusquedaComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private page: number = 1;
  private request: boolean = false;

  public tag: string = "todos";
  public loader: boolean = true;
  public loadMore: boolean = false;
  public results: IResultado[] = [];

  constructor(private _busqueda: BusquedaService, private router: Router) {
    if (this._busqueda.get().length < 4) this.router.navigate([""]);
  }

  public ngOnInit(): void {
    this.subscription = this._busqueda.receive().subscribe(() => {
      this.page = 1;
      this.results = [];
      this.getPage(true);
    });
    window.scroll(0, 0);
    this.getPage(true);
  }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public filter(tag: string): void {
    if (this.request) return;
    this.tag = tag;
    this.page = 1;
    this.results = [];
    this.loader = true;
    this.getPage(true);
  }

  public getPage(fetchData: boolean): void {
    if (!fetchData || this.request) return;
    this.request = true;
    if (!this.loader) this.loadMore = true;
    let error: string = "busqueda.componen.ts => getPage() => error: ";
    this._busqueda.search(this.tag, this.page).subscribe({
      next: (results: IResultado[] | null) => {
        if (results) {
          for (let result of results) {
            result.summary = recortarSummaryListadoTemplateFour(result.summary);
          }
          this.results = this.results.concat(results);
          this.page++;
        }
        if (this.loader) {
          this.loader = false;
        } else {
          this.loadMore = false;
        }
        this.request = false;
      },
      error: (err: any) => {
        console.error(error, err);
        this.loader = false;
        this.loadMore = false;
        this.request = false;
      },
      complete: () => {},
    });
  }
}
