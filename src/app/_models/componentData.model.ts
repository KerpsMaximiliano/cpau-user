import {DataOptions} from './dataOptions.model'

export interface IComponentData {
    id: string;
    name: string;
    options: Array<DataOptions>;
    required: boolean;
    type: string;
    value: string;

    // dependienteId?: number;
    // dependienteValor: string;
    // tieneDependencias?: boolean;

    // --> Locales
    isObserved?: Boolean;
    disabled?: Boolean;
}
