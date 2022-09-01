import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

export class IControl {
    public parentGroup: FormGroup;
    public allData: any;
    public onChangeComponent: EventEmitter<any>;
    // public disabled: Boolean;
  }
