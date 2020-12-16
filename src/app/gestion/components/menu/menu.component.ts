import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MenuComponent {

  @Output() colapsarMenu = new EventEmitter();

  colapsado: boolean[] = [];

  colapsar(i: number) {
    this.colapsado[i] = !this.colapsado[i];
  }

}
