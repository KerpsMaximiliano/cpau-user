import { Component } from "@app/_models/component";
import { IComponentData } from "@app/_models/componentData.model";
import { LabelAdapterComponent } from "../dynamicComponentsAdapters/label.componentAdapter";
import { LblCheckboxAdapterComponent } from "../dynamicComponentsAdapters/lblCheckbox.componentAdapter";
import { LblInputStringAdapterComponent } from "../dynamicComponentsAdapters/lblInput.string.componentAdapter";
import { LblRadioAdapterComponent } from "../dynamicComponentsAdapters/lblRadio.componentAdapter";
import { LblSelectAdapterComponent } from "../dynamicComponentsAdapters/lblSelect.componentAdapter";
import { LblTextareaAdapterComponent } from "../dynamicComponentsAdapters/lblTextareacomponentAdapter";

export class DynamicComponentFactory {
    static crearControl(datosComponente: IComponentData) {
        let comp

        switch (datosComponente.type) {
            case 'dropdown':
                comp = new Component(LblSelectAdapterComponent, datosComponente);
                break;
            case 'label':
                comp = new Component(LabelAdapterComponent, datosComponente);
                break;
            case 'textarea':
                comp = new Component(LblTextareaAdapterComponent, datosComponente);
                break;
            case 'radio':
                comp = new Component(LblRadioAdapterComponent, datosComponente);
                break;
            case 'checkbox':
                comp = new Component(LblCheckboxAdapterComponent, datosComponente);
                break;
            case 'text' || 'email' || 'password':
                comp = new Component(LblInputStringAdapterComponent, datosComponente);
                break;
        }

        return comp;
    }
}
