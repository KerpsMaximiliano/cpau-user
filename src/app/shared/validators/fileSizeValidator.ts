import { FormControl } from "@angular/forms";
export function fileSizeValidator(files: FileList) {
    return function(control: FormControl) {
    const file = control.value;
    if (file) {
        const fileSize = files.item(0).size;
        const fileSizeInKB = Math.round(fileSize / 1024);
        if (fileSizeInKB >= 4000) {
            return {
                fileSizeValidator: true
            };
        } else {
            return null;
        }
    }
        return null;
    };
}