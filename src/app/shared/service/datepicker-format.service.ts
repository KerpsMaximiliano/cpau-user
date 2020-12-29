import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct | null {
        if (value) {
            let date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0]),
                month: parseInt(date[1]),
                year: parseInt(date[2])
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        if (date) {
            let day = date.day >= 10 ? date.day : '0' + date.day;
            let month = date.month >= 10 ? date.month : '0' + date.month;
            return date ? day + this.DELIMITER + month + this.DELIMITER + date.year : '';
        }
        return '';
    }
}