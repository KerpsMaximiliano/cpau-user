import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckBoxDataModel } from '@app/shared/components/checkbox-list/models/CheckboxList.model';
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
    this.suscripcionService.getSuscripciones().subscribe(suscripciones => {
      this.publicaciones = suscripciones.filter(x => x.type === 1);
    });
    // this.actividadService.getObras().subscribe(obras => {
    //   this.obrasData = obras
    // })
  }

  public onSave(): void {
    this.loading = true;
    this.publicacionesForm.value.publicaciones
      .map((v, i) => this.publicaciones[i].selected = v);

    console.log(this.publicaciones);

    // const requestActividades = {
    //   id: selectedActividadesIds
    // } as ActividadProfesionalRequestModel



    this.suscripcionService.savePublicaciones(this.publicaciones)
      .subscribe(response => {
        if (response.success) {

          this.toastr.success('Actualizacion realizada con exito');
          this.loading = false;
        } else {
          this.toastr.error(response.message);
          this.loading = false;
        }
      })
  }
}
