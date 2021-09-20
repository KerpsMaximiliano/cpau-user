import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Suscripcion } from './Models/suscipcion.model';
import { SuscripcionService } from './services/suscripcion.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionComponent implements OnInit {
  collapsed: boolean;
  loading: boolean;
  public urlHelp = 'https://www.cpau.org/nota/34672';

  public publicacionesForm: FormGroup;


  public publicaciones: Suscripcion[];


  constructor(private formBuilder: FormBuilder,
              private suscripcionService: SuscripcionService,
              private toastr: ToastrService,

  ) {

    this.publicacionesForm = this.formBuilder.group({
    })
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.suscripcionService.getSuscripciones().subscribe(suscripciones => {
      this.publicaciones = suscripciones.filter(x => x.type === 1);
    });
  }

  public onSave(): void {
    this.loading = true;
    this.publicacionesForm.value.publicaciones
      .map((v, i) => this.publicaciones[i].selected = v);

    this.suscripcionService.savePublicaciones(this.publicaciones)
      .subscribe(response => {
        if (response.success) {

          this.toastr.success('Actualizacion realizada con exito');
          this.loading = false;
        } else {
          this.toastr.error(response.message);
          this.loading = false;
        }
      });
  }
  public cancelarFila(): void {
    this.publicacionesForm.reset();
    this.loadData();
  }
  protected reload() {
    this.loadData();
  }
}
