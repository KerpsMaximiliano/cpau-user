import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';

export interface Certificado {
  id: number;
  codigoCertificado: number;
  fechaHora: string;
}
export class Certificado implements Certificado {
  id: number;
  codigoCertificado: number;
  fechaHora: string;
  /**
   *
   */
  constructor(d) {
    this.id = d.id;
    this.codigoCertificado = d.codigoCertificado;
    this.fechaHora = d.fechaHora;
  }
}
