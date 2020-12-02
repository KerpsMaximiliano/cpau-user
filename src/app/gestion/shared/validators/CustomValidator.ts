

export class CustomValidator {
    // Validates URL
    static urlValidator(url): any {
       if (url.pristine) {
          return null;
       }
       const urlpattern = new RegExp('^((https?:\\/\\/)|(http?:\\/\\/))' + // protocol
       '((([a-z\\d]([a-z\\d-][a-z\\d]))\\.)+[a-z]{2,}|' + // domain name
       '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
       '(\\:\\d+)?(\\/[-a-z\\d%_.~+])' + // port and path
       '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
       '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

       url.markAsTouched();
       if (urlpattern.test(url.value)) {
          return null;
       }
       return {
          invalidUrl: true
       };
    }
    // Validates passwords
    static matchPassword(group): any {
       const password = group.controls.password;
       const confirm = group.controls.confirm;
       if (password.pristine || confirm.pristine) {
          return null;
       }
       group.markAsTouched();
       if (password.value === confirm.value) {
          return null;
       }
       return {
          invalidPassword: true
       };
    }
    // Validates numbers
    static numberValidator(num: any): any {
       if (num.pristine) {
          return null;
       }
       const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
       num.markAsTouched();
       if (NUMBER_REGEXP.test(num.value)) {
          return null;
       }
       return {
          invalidNumber: true
       };
    }
    // Validates US SSN
    static ssnValidator(ssn): any {
       if (ssn.pristine) {
          return null;
       }
       const SSN_REGEXP = /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
       ssn.markAsTouched();
       if (SSN_REGEXP.test(ssn.value)) {
          return null;
       }
       return {
          invalidSsn: true
       };
    }
    // Validates US phone numbers
    static phoneValidator(num: any): any {
       if (num.pristine) {
          return null;
       }
       const PHONE_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
       num.markAsTouched();
       if (PHONE_REGEXP.test(num.value)) {
          return null;
       }
       return {
          invalidNumber: true
       };
    }
    // Validates zip codes
    static zipCodeValidator(zip): any {
       if (zip.pristine) {
          return null;
       }
       const ZIP_REGEXP = /^[0-9]{5}(?:-[0-9]{4})?$/;
       zip.markAsTouched();
       if (ZIP_REGEXP.test(zip.value)) {
          return null;
       }
       return {
          invalidZip: true
       };
    }
}
