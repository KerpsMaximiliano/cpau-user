import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[component-container]',
})
export class ComponentContainer {
  constructor(public ViewContainerRef: ViewContainerRef) { }
}

