export interface Telefono {
    id: number;
    IdTipoTelefono: number;
    telefono: number;
    tipoDescripcion: string;
}



export interface TelefonoRequestModel {
    id: number;
    TipoTelefono: string;
    telefono: string;
}