import { Component, OnInit,Output,EventEmitter,Input, OnChanges } from '@angular/core';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '@app/_helpers/abstractvalue.accessor';
import {  FormControl, FormGroup  } from '@angular/forms';
import { IComponentData } from '@app/_models/componentData.model';
import { DataOptions } from '@app/_models/dataOptions.model';


export const CUSTOM_RADIOBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioControlComponent),
    multi: true
};

@Component({
  selector: 'radiocontrol-component',
  templateUrl: 'radioControl.component.html',
  styleUrls: ['radioControl.component.css'],
  providers: [CUSTOM_RADIOBUTTON_VALUE_ACCESSOR]
})

export class RadioControlComponent extends AbstractValueAccessor implements OnInit, OnChanges {
    _data: any = [];
    requiredControl: Boolean;
    selectedItem: DataOptions;
    id: string;
    /**OUTPUT */
    @Output() onInit = new EventEmitter<any>();
    /**INPUT */
    @Input() parentGroup: FormGroup;
    // @Input() id:number;
    // @Input() deshabilitado:boolean;
    @Input() required: boolean;
    @Input() allData: IComponentData;

    constructor() {
        super();
        this.selectedItem = {
            id: "",
            text: "",
            value: "",
            allowcomments: false,
            comments: ""
        };
    }

    ngOnInit() {
        this.id = this.allData.id;
        // this.onInit.emit();
        // this.data.forEach(element => {
        //     if (element.selected) {
        //         element.selected = true;
        //         this.parentGroup.controls[this.id].patchValue(element.value);
        //         this.writeValue(element.value);
        //     }
        // });
    }

    onClick(item: DataOptions) {
        if (item.id !== this.selectedItem.id) {
            this.selected(item);
        }
        this.onTouch();
        // this.allData.options.forEach(element => {
        //     if (element.id === item.id) {
        //         // element.selected = true;
        //         this.writeValue(element.value);
        //     }
        // });
    }

    ngOnChanges(changes) {
        // if(changes && changes.required && changes.required.currentValue !== undefined) {
        //     this.requiredControl = changes.required.currentValue;
        // }
    }

    isSelected(clickedItem) {
        let found = false;
        if (this.selectedItem.id === clickedItem.id) {
            found = true;
        }
        return found;
    }
    selected(item) {
        if (this.selectedItem.allowcomments) {
            this.parentGroup.removeControl(this.selectedItem.id)
        }
        this.selectedItem = item;
        this.writeValue(item.value);
        // this.onTouch();
        // this.onChange(this.selectedItem);
        if(item.allowcomments) {
            this.parentGroup.addControl(item.id, new FormControl())
        }
    }

    onBlur(event, id) {
        this.parentGroup.patchValue({[id]:event.target.value })
    }

}
