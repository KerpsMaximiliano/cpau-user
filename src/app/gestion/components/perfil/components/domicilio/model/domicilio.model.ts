import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';

export interface Domicilio {
    id: number;
    tipoDomicilio: string;
    idTipoDomicilio: number;
    calle: string;
    altura: number;
    piso?: number;
    depto?: string;
    localidad: string;
    codigoPostal: string;
}
export class Domicilio implements Domicilio {
      id: number;
      tipoDomicilio: string;
      idTipoDomicilio: number;
      calle: string;
      altura: number;
      piso?: number;
      depto?: string;
      localidad: string;
      codigoPostal: string;
      /**
       *
       */
      constructor(d, tiposDomicilios: SelectItem[]) {
        this.id = d.id;
        this.idTipoDomicilio = d.idTipoDomicilio;
        this.calle = d.calle;
        this.altura = d.altura;
        this.piso = d.piso;
        this.depto = d.depto;
        this.localidad = d.localidad;
        this.codigoPostal = d.codigoPostal;
        this.tipoDomicilio = tiposDomicilios.find(f => +f.id === +d.idTipoDomicilio).descripcion;
      }
}
