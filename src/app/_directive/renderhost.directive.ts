import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[render-host]',
})
export class RenderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}