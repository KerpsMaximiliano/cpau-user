import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Columna, Filas } from '@app/shared/Models/ActionTable';

@Component({
  selector: 'app-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.css']
})
export class ActionTableComponent {

  @Input() permiteVisualizar = true;
  @Input() permiteEditar = true;
  @Input() permiteEliminar = true;
  @Input() columnas: Columna<any>[] = [];
  @Input() filas: Filas<any>[] = [];

  @Output() visualizar = new EventEmitter();
  @Output() eliminar = new EventEmitter();
  @Output() editar = new EventEmitter();

}




