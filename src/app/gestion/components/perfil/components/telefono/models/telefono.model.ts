export interface Telefono {
    id: number;
    idTipoTelefono: number;
    telefono: number;
    tipoTelefono: string;
}



export interface TelefonoRequestModel {
    id: number;
    tipoTelefono: string;
    telefono: string;
}