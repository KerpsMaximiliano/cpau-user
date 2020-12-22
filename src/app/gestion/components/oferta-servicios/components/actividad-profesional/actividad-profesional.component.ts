import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CheckBoxDataModel } from '@app/shared/components/checkbox-list/models/CheckboxList.model';
import { ActividadProfesionalService } from './services/actividad-profesional.service';

@Component({
  selector: 'app-activicad-profesional',
  templateUrl: './actividad-profesional.component.html',
  styleUrls: ['./actividad-profesional.component.css']
})
export class ActividadProfesionalComponent implements OnInit {
  collapsed: boolean;
  public mailForm: FormGroup;

  public actividadProfesionalData = this.actividadService.getActividadProfesional();
  public obrasData = this.actividadService.getObras();


  constructor(private formBuilder: FormBuilder,
    private actividadService: ActividadProfesionalService
  ) {

    this.mailForm = this.formBuilder.group({

    })
  }

  ngOnInit() {
  }

}
