import { FormControl, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      value: new FormControl(),
      options: new FormArray([])
    });
  }

  @Input() public form: FormGroup;
  @Input() public field: any;

  ngOnInit() {
    this.id.setValue(this.field.id)
    if (this.field.type === 'checkbox') {
    this.formGroup.setControl('value', new FormArray([]));
    }
    if (this.field.options.length > 0) {
      this.field.options.forEach(option =>{
        const fg = new FormGroup({
          id: new FormControl(),
          allowcomments: new FormControl(),
        });
        // if (option.allowcomments == true) {
        //   fg.addControl('comments', new FormControl());
        // } ver si se puede
        this.options.push(fg);
      })
    }
    this.form.addControl(this.field.id, this.formGroup );
  }

  changeSelect(e: any) {
    this.value.setValue(e.target.value);
  }

  get id() {
    return this.formGroup.get('id');
  }

  get value() {
    return this.formGroup.get('value');
  }

  get options() {
    return this.formGroup.get('options') as FormArray;
  }

  onCheckboxChange(e) {
    const valueFA: FormArray = this.formGroup.get('value') as FormArray;
    if (e.target.checked) {
      valueFA.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      valueFA.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          valueFA.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
