export interface Columna<T> {
    id: keyof T;
    titulo: string;
}

export interface Filas<T> {
    valor: T;
}
