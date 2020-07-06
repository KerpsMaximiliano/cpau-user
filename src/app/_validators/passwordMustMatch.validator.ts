import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";


@Injectable()
export class PasswordMustMatchValidator {

  constructor() {
  }


static mustmatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustmatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }
}
