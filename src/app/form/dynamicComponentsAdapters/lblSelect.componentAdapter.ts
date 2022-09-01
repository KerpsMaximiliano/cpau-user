import { Component} from '@angular/core';
import { IControl } from '@app/_models/control';
import { DynamicComponentAdapterBase } from './dynamicComponentAdapterBase';

@Component({
  selector: 'lbl-select-adapter',
  templateUrl: 'lblSelect.componentAdapter.html'
})
export class LblSelectAdapterComponent extends DynamicComponentAdapterBase implements IControl {
    constructor() {
        super();
    }
}
