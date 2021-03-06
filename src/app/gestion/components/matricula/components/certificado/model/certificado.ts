import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';

export interface Certificado {
  id: number;
  codigo: number;
  fechaHora: string;
}
export class Certificado implements Certificado {
  id: number;
  codigo: number;
  fechaHora: string;
  /**
   *
   */
  constructor(d) {
    this.id = d.id;
    this.codigo = d.codigo;
    this.fechaHora = d.fechaHora;
  }
}
