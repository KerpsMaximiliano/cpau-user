import { Component} from '@angular/core';
import { IControl } from '@app/_models/control';
import { DynamicComponentAdapterBase } from './dynamicComponentAdapterBase';

@Component({
  selector: 'lbl-checkbox-adapter',
  templateUrl: 'lblCheckbox.componentAdapter.html'
})
export class LblCheckboxAdapterComponent extends DynamicComponentAdapterBase implements IControl {
    constructor() {
        super();
    }
}
