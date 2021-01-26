import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckBoxDataModel } from '@app/shared/components/checkbox-list/models/CheckboxList.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {
  collapsed: boolean;
  loading: boolean;

  public suscripcionForm: FormGroup;


  public actividadProfesionalData: CheckBoxDataModel[];
  public obrasData: CheckBoxDataModel[]


  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,

  ) {

    this.suscripcionForm = this.formBuilder.group({
    })
  }

  ngOnInit() {
    // this.actividadService.getActividadProfesional().subscribe(actividades => {
    //   this.actividadProfesionalData = actividades;
    // });
    // this.actividadService.getObras().subscribe(obras => {
    //   this.obrasData = obras
    // })
  }

  public onSave(): void {
    this.loading = true;
    // const selectedActividadesIds = this.actividadForm.value.actividad
    //   .map((v, i) => v ? this.actividadProfesionalData[i].id : null)
    //   .filter(v => v !== null);

    // const requestActividades = {
    //   id: selectedActividadesIds
    // } as ActividadProfesionalRequestModel



    // this.actividadService.guardarActividadProfesional(requestActividades)
    //   .subscribe(response => {
    //     if (response.success) {
    //       this.actividadService.guardarObrasRealizada(requestObras)
    //         .subscribe(response => {
    //           if (response.success) {
    //             this.toastr.success('Actualizacion realizada con exito');
    //             this.loading = false;
    //           } else {
    //             this.toastr.error(response.message);
    //             this.loading = false;
    //           }
    //         })
    //     } else {
    //       this.toastr.error(response.message);
    //       this.loading = false;
    //     }
    //   })
  }
}
