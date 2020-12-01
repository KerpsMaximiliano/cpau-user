import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

export interface FieldErrors {
  [key: string]: boolean;
}

export type FieldErrorsMessages = string | { [key: string]: string };

@Component({
  selector: 'form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnDestroy {

  @Input()
  public errorsMessages: FieldErrorsMessages;

  @Input()
  set controlTouched(touched: boolean) {
    this.touched = touched;

    this.checkShowErrors();
  }

  @Input()
  set errors(errors: FieldErrors) {
    this.errorStr = '';

    if (errors) {
      if (typeof this.errorsMessages === 'string') {
        this.errorStr = this.errorsMessages;
      } else {
        for (const key in errors) {
          if (this.errorsMessages && this.errorsMessages[key]) {
            this.errorStr += `${this.errorsMessages[key]} `;
          }
        }
      }
    }
    this.checkShowErrors();
  }

  @Output()
  readonly fieldHasErrors: EventEmitter<boolean> = new EventEmitter<boolean>();

  public errorStr = '';
  public touched = false;
  private emitHidingErrors = false;
  private emitShowingErrors = true;

  constructor() { }

  public ngOnDestroy() {
    if (this.emitHidingErrors) {
      this.fieldHasErrors.emit(false);
    }
  }

  private checkShowErrors(): void {
    if (this.touched && this.errorStr) {
      this.emitHidingErrors = true;

      if (this.emitShowingErrors) {
        this.emitShowingErrors = false;
        this.fieldHasErrors.emit(true);
      }
    } else if (this.emitHidingErrors) {
      this.emitHidingErrors = false;
      this.emitShowingErrors = true;
      this.fieldHasErrors.emit(false);
    }
  }

}
