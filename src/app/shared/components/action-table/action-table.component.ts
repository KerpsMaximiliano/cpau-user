import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fila } from '@app/shared/Models/ActionTable';

@Component({
  selector: 'app-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.css']
})
export class ActionTableComponent {

  @Input() permiteVisualizar = true;
  @Input() permiteEditar = true;
  @Input() permiteEliminar = true;
  @Input() columnas: string[] = [];
  @Input() filas: Fila[] = [];

  @Output() visualizar = new EventEmitter();
  @Output() eliminar = new EventEmitter();
  @Output() editar = new EventEmitter();

}
