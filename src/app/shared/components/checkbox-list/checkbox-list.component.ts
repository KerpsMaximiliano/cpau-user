import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css']
})
export class CheckboxListComponent implements OnInit {

  @Input() public form: FormGroup;

  @Input() public ordersData: any;

  get ordersFormArray() {
    return this.form.controls.checklist as FormArray;
  }
  constructor(private formBuilder: FormBuilder) {
    // this.form = this.formBuilder.group({
    //   orders: new FormArray([])
    // });
    this.form.addControl('checklist', new FormArray([]));
    this.addCheckboxes();
  }

  public ngOnInit(): void {
  }

  private addCheckboxes() {
    this.ordersData.forEach((d) => this.ordersFormArray.push(new FormControl(d.selected)));
  }

  submit() {
    const selectedOrderIds = this.form.value.checklist
      .map((checked, i) => checked ? this.ordersData[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }

}
