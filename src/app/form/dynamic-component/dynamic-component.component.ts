import { Component, Input, Output, EventEmitter, AfterContentInit, ViewChild, ComponentFactoryResolver, ComponentRef, Type, OnChanges, SimpleChanges  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentData } from '@app/_models/componentData.model';
import { IControl } from '@app/_models/control';
import { ComponentContainer } from '../directives/componentContainer';
import { DynamicComponentFactory } from './dynamicComponentFactory';

@Component({
  selector: 'dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponent implements AfterContentInit, OnChanges {
  @Input() parentGroup: FormGroup;
  @Input() data: IComponentData;
  // @Input() parentValue: String; // --> Valor del control del cual depende
  // @Input() disabled: boolean;
  @ViewChild(ComponentContainer, {static:true}) container: ComponentContainer;

  @Output() onChangeComponent: EventEmitter<any> = new EventEmitter<any>();

  private componentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterContentInit() {
    this.loadComponent();
  }

  ngOnChanges(changes) {
    // if (changes.parentValue && this.componentRef) {
    //   if (changes.parentValue.currentValue === this.data.dependienteValor) {
    //     this.componentRef.instance.disabled = true;
    //   } else {
    //     this.componentRef.instance.disabled = false;
    //   }
    // }
  }

  loadComponent() {
    // if (this.data) {
    //   if(this.disabled !== undefined) {
    //     this.data.isEditable = !this.disabled;
    //   } else if (this.data.dependienteId && !this.data.preCarga) {
    //     this.data.isEditable = false;
    //   }
    let component = DynamicComponentFactory.crearControl(this.data);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component.type);

    let viewContainerRef = this.container.ViewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);

    this.componentRef.instance.allData = component.data;
    this.componentRef.instance.parentGroup = this.parentGroup;
    // if(this.data.isObserved){
    this.componentRef.instance.onChangeComponent.subscribe(val => this.onChanges(val));
    // }
  }

  onChanges(value) {
    this.onChangeComponent.emit({ parentValue: value, parentID: this.data.id, data: this.data });
  }
}



