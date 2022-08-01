import { Component, OnInit,Output,EventEmitter,Input, ChangeDetectorRef, AfterContentInit, OnChanges, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractValueAccessor } from '@app/_helpers/abstractvalue.accessor';
import { IComponentData } from '@app/_models/componentData.model';

export const CUSTOM_SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectControlComponent),
    multi: true
};

@Component({
    selector: 'selectscontrol-component',
    templateUrl: 'selectControl.component.html',
    styleUrls: ['selectControl.component.css'],
    providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
})

export class SelectControlComponent extends AbstractValueAccessor implements OnInit, OnChanges {

    /**OUTPUT */
    @Output() onItemChange = new EventEmitter<any>();
    /**INPUT */
    @Input() parentGroup: FormGroup;
    @Input() allData: IComponentData;
    id: string;
    selectText: string;
    requiredControl: Boolean;
    constructor() {
        super();
    }

    ngOnInit() {
        this.id = this.allData.id;
        if(!this.selectText) {
            this.selectText =  'Seleccione una opción';
        }
    }

    ngOnChanges(changes) {
        // if(changes && changes.required && changes.required.currentValue !== undefined) {
        //     setTimeout(() => {
        //         this.requiredControl = Boolean(changes.required.currentValue);
        //     }, 100);
        // }

        // var isNotValid = !this.data;
        // if(!isNotValid &&
        //     this.data.length === 1 &&
        //     !this.defaultEnabled &&
        //     !this.disabledAutoSelect) {
        //         this.value = this.data[0].id;
        //         this.onItemChange.emit(this.value);
        // }
    }

    onItemChanges(val) {
        this.onItemChange.emit(val);
    }

    objectKeys (objeto: any) {
        if (objeto && objeto.length > 0 && Array.isArray(objeto)) {
            return objeto;
        } else {
            return [];
        }
    }
}
