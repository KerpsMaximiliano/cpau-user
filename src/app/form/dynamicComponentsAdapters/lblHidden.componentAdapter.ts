import { Component} from '@angular/core';
import { IControl } from '@app/_models/control';
import { DynamicComponentAdapterBase } from './dynamicComponentAdapterBase';

@Component({
  selector: 'lbl-hidden-adapter',
  templateUrl: 'lblHidden.componentAdapter.html'
})
export class LblHiddenAdapterComponent extends DynamicComponentAdapterBase implements IControl {
    constructor() {
        super();
    }
}
