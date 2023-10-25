import { Component, OnInit } from "@angular/core";

// * Services.
import { BoletinesService } from "@app/_services/boletines.service";

// * Interfaces.
export interface IBoletin {
  titulo: string;
  fechaEnvio: string;
  fechaEnvioString: string;
  numero: number;
  texto1: string | null;
  texto2: string | null;
  texto3: string | null;
  publicado: boolean;
  notasConCopete: number;
  especial: boolean;
  urlContenido: string | null;
  id: number;
}

@Component({
  selector: "app-boletines",
  templateUrl: "./boletines.component.html",
  styleUrls: ["./boletines.component.css"],
})
export class BoletinesComponent implements OnInit {
  private page: number = 1;

  public loader: boolean = true;
  public tag: string = "todos";
  public boletines: IBoletin[] = [];

  constructor(private _boletines: BoletinesService) {}

  public ngOnInit(): void {
    window.scroll(0, 0);
    this.getPage(true);
  }

  public filter(tag: string): void {
    this.loader = !this.loader;
    this.tag = tag;
    this.page = 1;
    this.boletines = [];
    this.getPage(true);
  }

  public getPage(fetchData: boolean) {
    let error: string = "boletines.componen.ts => getPage() => error: ";
    if (fetchData) {
      this._boletines.getPage(this.tag, this.page).subscribe({
        next: (boletines: IBoletin[] | null) => {
          if (boletines) {
            this.boletines = this.boletines.concat(boletines);
            this.page++;
          }
          this.loader = false;
        },
        error: (err: any) => {
          console.error(error, err);
          this.loader = false;
        },
        complete: () => {},
      });
    }
  }
}
