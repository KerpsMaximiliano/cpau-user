import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";


@Injectable()
export class ValueMustMatchValidator {

  constructor() {
  }


static mustmatch(value: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }
      // set error on matchingControl if validation fails
      if (value !== matchingControl.value) {
          matchingControl.setErrors({ mustmatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }
}
