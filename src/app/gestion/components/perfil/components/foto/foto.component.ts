import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { IdentificacionService } from "../identificacion/service/identificacion.service";

@Component({
  selector: "app-foto",
  templateUrl: "./foto.component.html",
  styleUrls: ["./foto.component.css"],
})
export class FotoComponent implements OnInit {
  public img: string;
  public urlHelp = "https://www.cpau.org/nota/35486";
  collapsed: boolean;
  public form: FormGroup;
  loading: boolean;

  constructor(
    private _form: FormBuilder,
    private _toastrService: ToastrService,
    private _identificationService: IdentificacionService
  ) {
    this.form = this._form.group({
      politica: [],
      ficha: [false],
      credencial: [false],
      perfil: [false],
      id: [],
    });
  }

  public get hasPolicy(): boolean {
    return this.form.controls.politica.value;
  }

  public ngOnInit(): void {
    if (this._identificationService.img) {
      this.img = this._identificationService.img;
    } else {
      this._identificationService.readImage().subscribe((i) => {
        if (i.success) {
          this.img = `data:image/jpg;base64,${i.entity.image}`;
          this._identificationService.img = `data:image/jpg;base64,${i.entity.image}`;
        }
      });
    }

    this._load();
  }

  public reload(): void {
    this._load();
  }

  public cancelarFila(): void {
    this.form.reset();
    this._load();
  }

  public onSave(): void {
    if (this.form.valid) {
      this.loading = true;
      this.form.markAllAsTouched();

      this._identificationService
        .updateFoto(this.form.value)
        .subscribe((response) => {
          if (response.success) {
            this._toastrService.success("Actualizacion realizada con exito");
            this.loading = false;
            location.reload();
          } else {
            this._toastrService.error(response.message);
            this.loading = false;
          }
        });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.error(
        null,
        "Por favor complete los datos requeridos."
      );
    }
  }

  public changeCheck(event): void {
    console.log(event);
    if (!this.hasPolicy) {
      this.form.controls["perfil"].enable();
      this.form.controls["credencial"].enable();
      this.form.controls["ficha"].enable();
    } else {
      this.form.controls["perfil"].disable();
      this.form.controls["credencial"].disable();
      this.form.controls["ficha"].disable();
      this.form.controls["perfil"].setValue(false);
      this.form.controls["credencial"].setValue(false);
      this.form.controls["ficha"].setValue(false);
    }
  }

  private _load(): void {
    this._identificationService.readFoto().subscribe((f) => {
      this.form.patchValue(f.entity);
      if (this.hasPolicy) {
        this.form.controls["perfil"].enable();
        this.form.controls["credencial"].enable();
        this.form.controls["ficha"].enable();
      } else {
        this.form.controls["perfil"].disable();
        this.form.controls["credencial"].disable();
        this.form.controls["ficha"].disable();
      }
    });
  }
}
