import { Output, EventEmitter, Input  } from '@angular/core';
import {  FormGroup  } from '@angular/forms';
import { AbstractValueAccessor } from '@app/_helpers/abstractvalue.accessor';
import { IControl } from '@app/_models/control';

export class DynamicComponentAdapterBase extends AbstractValueAccessor implements IControl {

    /**OUTPUT */
    @Output() onChangeComponent = new EventEmitter<any>();
    /**INPUT */
    @Input() parentGroup: FormGroup;
    // @Input() labelText:string;
    // @Input() required:boolean;
    // @Input() name:string;
    // @Input() disableControl:boolean;
    // @Input() disabled:boolean;

    @Input() allData: any;

    onChangeComponentEvent(ev) {
        this.onChangeComponent.emit(ev);
    }
}
