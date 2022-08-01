import { Component} from '@angular/core';
import { IControl } from '@app/_models/control';
import { DynamicComponentAdapterBase } from './dynamicComponentAdapterBase';

@Component({
  selector: 'lbl-input-string-adapter',
  templateUrl: 'lblInput.string.componentAdapter.html'
})
export class LblInputStringAdapterComponent extends DynamicComponentAdapterBase implements IControl {
    constructor() {
        super();
    }
}
