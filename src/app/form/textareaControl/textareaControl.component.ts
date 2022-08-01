import { Component, OnInit,Output,EventEmitter,Input, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractValueAccessor } from '@app/_helpers/abstractvalue.accessor';
import { IComponentData } from '@app/_models/componentData.model';
import { IControl } from '@app/_models/control';

export const CUSTOM_TEXTAREA_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaControlComponent),
    multi: true
  };

@Component({
  selector: 'txtareacontrol-component',
  templateUrl: './textareaControl.component.html',
  providers: [CUSTOM_TEXTAREA_VALUE_ACCESSOR],
})

export class TextAreaControlComponent extends AbstractValueAccessor implements OnInit, IControl {

  /**OUTPUT */
  @Output() onChangeComponent = new EventEmitter<any>();
  /**INPUT */
  @Input() parentGroup: FormGroup;
  @Input() allData: IComponentData;

  labelText:string;
  placeholder:string;
  id:string;
  disabled:boolean;
  required:boolean;

  ngOnInit() {
    this.labelText = this.allData.name;
    this.required = this.allData.required;
    this.id = this.allData.id;
    this.disabled = false;
    this.placeholder = this.allData.value;
  }

  // onChangeTextarea(value) {
  //     this.onChangeComponent.emit(value);
  // }
}
