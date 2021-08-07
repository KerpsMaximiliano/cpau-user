import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";

export interface Telefono {
    id: number;
    idTipoTelefono: number;
    telefono: number;
    tipoTelefono: string;
    celufijo: string;
}



export interface TelefonoRequestModel {
    id: number;
    tipoTelefono: string;
    telefono: string;
    celufijo: string;
}