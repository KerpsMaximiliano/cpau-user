export interface IFoto {
    idContact: number;
    image: string;
    politica: boolean;
    ficha: boolean;
    credencial: boolean;
    perfil: boolean;
    id: number
}

export interface IResponseFoto {
    entity: IFoto;
    message: string;
    success: boolean;
}
