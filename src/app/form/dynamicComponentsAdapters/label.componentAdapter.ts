import { Component} from '@angular/core';
import { IControl } from '@app/_models/control';
import { DynamicComponentAdapterBase } from './dynamicComponentAdapterBase';

@Component({
  selector: 'label-adapter',
  templateUrl: 'label.componentAdapter.html'
})
export class LabelAdapterComponent extends DynamicComponentAdapterBase implements IControl {
    constructor() {
        super();
    }
}