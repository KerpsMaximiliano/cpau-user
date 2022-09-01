import { Component, OnInit,Output,EventEmitter,Input, forwardRef } from '@angular/core';
import {  ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { AbstractValueAccessor } from '@app/_helpers/abstractvalue.accessor';
import { IComponentData } from '@app/_models/componentData.model';
import { DataOptions } from '@app/_models/dataOptions.model';

export const CUSTOM_CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxControlComponent),
    multi: true
  };

@Component({
  selector: 'checkboxcontrol-component',
  templateUrl: 'checkboxControl.component.html',
  styleUrls: ['checkboxControl.component.css'],
  providers: [CUSTOM_CHECKBOX_VALUE_ACCESSOR]
})

export class CheckboxControlComponent implements OnInit, ControlValueAccessor {

    /**OUTPUT */
    @Output() onCheck = new EventEmitter<any>();
    @Output() onChangeComponent = new EventEmitter<any>();
    /**INPUT */
    @Input() allData: IComponentData;
    @Input() parentGroup: FormGroup;
    selectedItems: DataOptions[];
    id: string;

    constructor() {
    }

    ngOnInit() {
        this.id = this.allData.id;
        this.selectedItems = [];
    }

    onItemClick(item: DataOptions) {
        const found = this.isSelected(item);
        if(!found) {
                this.addSelected(item);
                // this.onSelect.emit(item);
        } else {
            this.removeSelected(item);
            // this.onDeSelect.emit(item);
        }
        let values = this.selectedItems.map(item => {
            return item.value;
        })
        this.onChangeComponent.emit(values);
    }

    isSelected(clickedItem) {
        let found = false;
        this.selectedItems.forEach(item => {
            if(clickedItem.id === item.id) {
               found = true;
           }
        });
        return found;
    }
    addSelected(item) {
        this.selectedItems.push(item);
        this.onTouch();
        const value = this.selectedItems.map(item => item.value);
        this.onChange(value);
        if(item.allowcomments) {
            this.parentGroup.addControl(item.id, new FormControl())
        }
    }
    removeSelected(clickedItem) {
        this.selectedItems.forEach(item => {
            if(clickedItem.id === item.id) {
                this.selectedItems.splice(this.selectedItems.indexOf(item),1);
                if(item.allowcomments) {
                    this.parentGroup.removeControl(item.id)
                }
            }
        });
        this.onTouch();
        const value = this.selectedItems.map(item => item.value);
        this.onChange(value);
    }

    onChange: any = (_: any) => {}
    onTouch: any = () => {}

    writeValue(val: any): void {
        if (val) {
            this.selectedItems = val;
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    onBlur(event, id) {
        this.parentGroup.patchValue({[id]:event.target.value })
    }

}
