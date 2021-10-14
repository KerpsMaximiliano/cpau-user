
export interface Inscripcion {
  id: number;
  name: string;
  link: string;
}
export class Inscripcion implements Inscripcion {
  id: number;
  name: string;
  link: string;
  /**
   *
   */
  constructor(d) {
    this.id = d.id;
    this.name  = d.name;
  }
}

