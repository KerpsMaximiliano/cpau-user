import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, OnChanges, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractValueAccessor } from '@app/_helpers/abstractvalue.accessor';
import { IComponentData } from '@app/_models/componentData.model';

export const CUSTOM_HIDDEN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HiddenControlComponent),
  multi: true
};

@Component({
  selector: 'hiddencontrol-component',
  templateUrl: 'hidden.control.html',
  providers:[CUSTOM_HIDDEN_VALUE_ACCESSOR]
})
export class HiddenControlComponent extends AbstractValueAccessor implements OnInit {
  // --> Input
  @Input() parentGroup: FormGroup;
  @Input() allData: IComponentData;

  // --> Outputs
  // @Output() onBlur = new EventEmitter<any>();
  // @Output() onEnter = new EventEmitter<any>();
  @Output() onChangeComponent = new EventEmitter<any>();

  id: string;
  required: boolean;
  // requiredControl: Boolean;

  ngOnInit() {
    this.required = this.allData.required;
    this.id = this.allData.id;
    if (this.allData.value) {
      this.parentGroup.controls[this.id].patchValue(this.allData.value);
    }
  }

}
