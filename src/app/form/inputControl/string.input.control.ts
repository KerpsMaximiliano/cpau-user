import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, OnChanges, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractValueAccessor } from '@app/_helpers/abstractvalue.accessor';
import { IComponentData } from '@app/_models/componentData.model';

export const CUSTOM_STRINGINPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StringInputControlComponent),
  multi: true
};

@Component({
  selector: 'inputcontrol-component',
  templateUrl: 'string.input.control.html',
  styleUrls: ['string.input.control.css'],
  providers:[CUSTOM_STRINGINPUT_VALUE_ACCESSOR]
})
export class StringInputControlComponent extends AbstractValueAccessor implements OnInit, OnChanges {
  // --> Input
  @Input() parentGroup: FormGroup;
  @Input() allData: IComponentData;

  // --> Outputs
  // @Output() onBlur = new EventEmitter<any>();
  // @Output() onEnter = new EventEmitter<any>();
  @Output() onChangeComponent = new EventEmitter<any>();

  id: string;
  type: string;
  labelText: string;
  placeholder: string;
  required: boolean;
  // requiredControl: Boolean;

  ngOnInit() {
    this.labelText = this.allData.name;
    this.required = this.allData.required;
    this.id = this.allData.id;
    this.placeholder = this.allData.value;
    this.type = this.allData.type;
  }

  changedInput(value) {
    this.onChangeComponent.emit(value);
  }

  ngOnChanges(changes) {
    // if(changes && changes.required && changes.required.currentValue !== undefined) {
    //     this.requiredControl = changes.required.currentValue;
    // }
  }

  // onEnterEvent (value: string) {
  //   this.onEnter.emit({value: value});
  // }

}
