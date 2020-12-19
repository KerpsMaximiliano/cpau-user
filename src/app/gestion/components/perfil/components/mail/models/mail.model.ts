export interface Mail {
    id: number;
    idTipoEmail: number;
    tipoEmail: string;
    email: string;
}



export interface MailRequestModel {
    id: number;
    tipoEmail: number;
    email: number;
}