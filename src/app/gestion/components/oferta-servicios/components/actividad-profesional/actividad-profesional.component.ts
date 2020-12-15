import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CheckBoxDataModel } from '@app/shared/components/checkbox-list/models/CheckboxList.model';

@Component({
  selector: 'app-activicad-profesional',
  templateUrl: './actividad-profesional.component.html',
  styleUrls: ['./actividad-profesional.component.css']
})
export class ActividadProfesionalComponent implements OnInit {
  collapsed: boolean;
  public mailForm: FormGroup;
  public checkData: CheckBoxDataModel[] = [
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },
    { id: 100, title: 'checkbox 1', selected: true },
    { id: 200, title: 'checkbox 2', selected: false },
    { id: 300, title: 'checkbox 3', selected: true },
    { id: 400, title: 'checkbox 4', selected: false },

  ];

  constructor(private formBuilder: FormBuilder,
  ) {

    this.mailForm = this.formBuilder.group({

    })
  }

  ngOnInit() {
  }

}
