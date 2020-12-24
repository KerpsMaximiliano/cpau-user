import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckBoxDataModel } from '@app/shared/components/checkbox-list/models/CheckboxList.model';
import { ToastrService } from 'ngx-toastr';
import { ActividadProfesionalRequestModel, ObrasRequestModel } from './models/actividad-profesiona.model';
import { ActividadProfesionalService } from './services/actividad-profesional.service';

@Component({
  selector: 'app-activicad-profesional',
  templateUrl: './actividad-profesional.component.html',
  styleUrls: ['./actividad-profesional.component.css']
})
export class ActividadProfesionalComponent implements OnInit {
  collapsed: boolean;
  public actividadForm: FormGroup;

  public actividadProfesionalData: CheckBoxDataModel[];
  public obrasData: CheckBoxDataModel[]


  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private actividadService: ActividadProfesionalService
  ) {

    this.actividadForm = this.formBuilder.group({

    })
  }

  ngOnInit() {
    this.actividadService.getActividadProfesional().subscribe(actividades => {
      this.actividadProfesionalData = actividades;
    });
    this.actividadService.getObras().subscribe(obras => {
      this.obrasData = obras
    })
  }

  public onSave(): void {


    const selectedActividadesIds = this.actividadForm.value.actividad
      .map((v, i) => v ? this.actividadProfesionalData[i].id : null)
      .filter(v => v !== null);
    console.log(selectedActividadesIds);

    const requestActividades = {
      id: selectedActividadesIds
    } as ActividadProfesionalRequestModel

    // const selectedObrasIds = this.actividadForm.value.obra
    // .map((v, i) => v ? this.actividadProfesionalData[i].id : null)
    // .filter(v => v !== null);
    // console.log(selectedObrasIds);

    // const requestObras = {
    //   id: selectedObrasIds
    // } as ObrasRequestModel

    this.actividadService.guardarActividadProfesional(requestActividades).subscribe(response => {
      if (response.success) {
        this.toastr.success('Actualizacion realizada con exito')
      } else {
        this.toastr.error(response.message);
      }
    })
    // this.actividadService.guardarObrasRealizada(requestObras).subscribe(response => {
    //   if (response.success) {
    //     this.toastr.success('Actualizacion realizada con exito')
    //   } else {
    //     this.toastr.error(response.message);
    //   }
    // })
  }
}
