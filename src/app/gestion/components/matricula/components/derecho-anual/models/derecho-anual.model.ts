import { DetalleDeuda } from "./detalle-deuda.model";

export interface DerechoAnual {
    puedePagar: boolean;
    detalle: DetalleDeuda[];
    matriculaBonificada: boolean;
    pendienteActivacion: boolean;
}
