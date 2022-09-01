import { Component} from '@angular/core';
import { IControl } from '@app/_models/control';
import { DynamicComponentAdapterBase } from './dynamicComponentAdapterBase';

@Component({
  selector: 'lbl-textarea-adapter',
  templateUrl: 'lblTextareacomponentAdapter.html'
})
export class LblTextareaAdapterComponent extends DynamicComponentAdapterBase implements IControl {
    constructor() {
        super();
    }
}