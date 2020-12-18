import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Identificacion } from '../perfil/components/identificacion/model/identificacion.model';
import { IdentificacionService } from '../perfil/components/identificacion/service/identificacion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MenuComponent implements OnInit {

  @Output() colapsarMenu = new EventEmitter();

  colapsado: boolean[] = [];
  perfil: Identificacion;

  constructor(private identificacionService: IdentificacionService) { }

  ngOnInit(): void {
    this.identificacionService.read().subscribe(identificacion => {
      this.identificacionService.currentIdentificacionValue = identificacion;
    });

    this.identificacionService.getCurrentIdentificacionValue().subscribe(x => this.perfil = x);
  }
  
  colapsar(i: number) {
    this.colapsado[i] = !this.colapsado[i];
  }

}
