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
  collapsed2: boolean;
  loading: boolean;
  public actividadForm: FormGroup;

  public actividadProfesionalData: CheckBoxDataModel[];
  public obrasData: CheckBoxDataModel[];
  public urlHelp = 'https://cpau.org/Content/institucional/%2F%2Fpreguntas-frecuentes%2Fherramientas-online';

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private actividadService: ActividadProfesionalService
  ) {

    this.actividadForm = this.formBuilder.group({
    })
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.actividadService.getActividadProfesional().subscribe(actividades => {
      this.actividadProfesionalData = actividades.filter(f => f.id === f.id);

      this.actividadService.getObras().subscribe(obras => {
        this.obrasData = obras.filter(f => f.id === f.id);
      });
    });
  }

  public onSave(): void {
    this.loading = true;
    const selectedActividadesIds = this.actividadForm.value.actividad
      .map((v, i) => v ? this.actividadProfesionalData[i].id : null)
      .filter(v => v !== null);

    const requestActividades = {
      id: selectedActividadesIds
    } as ActividadProfesionalRequestModel

    const selectedObrasIds = this.actividadForm.value.obra
      .map((v, i) => v ? this.obrasData[i].id : null)
      .filter(v => v !== null);

    const requestObras = {
      id: selectedObrasIds
    } as ObrasRequestModel

    this.actividadService.guardarActividadProfesional(requestActividades)
      .subscribe(response => {
        if (response.success) {
          this.actividadService.guardarObrasRealizada(requestObras)
            .subscribe(response => {
              if (response.success) {
                this.toastr.success('Actualizacion realizada con exito');
                this.loading = false;
              } else {
                this.toastr.error(response.message);
                this.loading = false;
              }
            })
        } else {
          this.toastr.error(response.message);
          this.loading = false;
        }
      })
  }
  public cancelarFila(): void {
    this.actividadForm.reset();
    this.loadData();
  }

  protected reload() {
    this.loadData();
  }
}
