import {Injectable} from "@angular/core";
import {FormControl} from "@angular/forms";


@Injectable()
export class DateValidator {

  constructor() {
  }

  static date(c: FormControl) {
    const dateRegEx = new RegExp(/^\d{4}\-\d{1,2}\-\d{1,2}$/);
    return dateRegEx.test(c.value) ? null : {date: true}
  }
}
