import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CheckBoxDataModel } from './models/CheckboxList.model';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css']
})
export class CheckboxListComponent implements OnInit {

  @Input() public form: FormGroup;

  @Input() public checkboxData: CheckBoxDataModel[];
  @Input() public controlName: string;


  get ordersFormArray() {
    return this.form.controls[this.controlName] as FormArray;
  }
  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.form.addControl(this.controlName, new FormArray([]));
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.checkboxData.forEach((d) => this.ordersFormArray.push(new FormControl(d.selected)));
  }
}
