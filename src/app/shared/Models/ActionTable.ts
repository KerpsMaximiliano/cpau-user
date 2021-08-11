import { ColumnType } from '../enum/ColumnType.enum';

export interface Columna<T> {
    id: keyof T;
    titulo: string;
    tipo?: ColumnType;
}

export interface Filas<T> {
    valor: T;
    ocultarEliminar?: boolean;
    campoSumarizador?: string;
}
