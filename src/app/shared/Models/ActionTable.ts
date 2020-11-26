export class Fila {
    valores: Valores[] = [];
}

export class Valores {
    valor: any;
    tipoDato?: string;

    /**
     *
     */
    constructor(v: Valores) {
        this.valor = v.valor;
        this.tipoDato = v.tipoDato;
    }
}
