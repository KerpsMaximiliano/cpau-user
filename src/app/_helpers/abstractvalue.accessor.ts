import { ControlValueAccessor } from '@angular/forms';

export {NG_VALUE_ACCESSOR} from '@angular/forms';
export {forwardRef} from '@angular/core';
const noop = () => {
  //
 };

export abstract class AbstractValueAccessor implements ControlValueAccessor {
  _value: any = undefined;
  onChange: any = (_: any) => {}
  onTouch: any = () => {}
  get value(): any { return this._value; }
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.valueChange();
      this.onChange(this._value);
    }
  }
  writeValue(v: any) {
    this._value = v;
    this.valueChange();
    this.onChange(this._value);
  }
  public valueChange() {
    return;
  }
  registerOnChange(fn: any): void {
      this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
      this.onTouch = fn;
  }

  _onTouchedCallback(fn: any): void {
    this.onTouch = fn;
  }
}
