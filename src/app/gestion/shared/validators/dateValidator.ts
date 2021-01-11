import {FormGroup} from '@angular/forms';

export function DateValidator(from: string, to: string): { [ key: string]: any} | null { 
    return (group: FormGroup): {[key: string]: boolean} => {
        let f = group.controls[from];
        let t = group.controls[to];
        if (f.value && t.value) {
            if (new Date(f.value.year,f.value.month,f.value.day) > new Date(t.value.year,t.value.month,t.value.day)) {
              return {
                dates: true
              };
            }
        }
        return {};
      }
}
