import {Injectable} from "@angular/core";
import {FormControl} from "@angular/forms";


@Injectable()
export class CuitValidator {

  constructor() {
  }

  // Valida digito verificador, sirve para CUIT y CUIL
  static cuit(c: FormControl) {
    var acumulado   = 0;
    var digitos     = c.value.split("");
    var digito      = digitos.pop();
    for(var i = 0; i < digitos.length; i++) {
        acumulado += digitos[9 - i] * (2 + (i % 6));
    }
    var verif = 11 - (acumulado % 11);
    if(verif == 11) {
        verif = 0;
    } else if(verif == 10) {
        verif = 9;
    }
    return digito == verif ? null : {cuit: true} ;
  }
}















