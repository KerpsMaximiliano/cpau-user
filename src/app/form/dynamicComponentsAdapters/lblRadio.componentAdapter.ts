import { Component} from '@angular/core';
import { IControl } from '@app/_models/control';
import { DynamicComponentAdapterBase } from './dynamicComponentAdapterBase';

@Component({
  selector: 'lbl-radio-adapter',
  templateUrl: 'lblRadio.componentAdapter.html'
})
export class LblRadioAdapterComponent extends DynamicComponentAdapterBase implements IControl {
    constructor() {
        super();
    }
}
