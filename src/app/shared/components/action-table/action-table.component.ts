import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnType } from '@app/shared/enum/ColumnType.enum';
import { Columna, Filas } from '@app/shared/Models/ActionTable';

@Component({
  selector: 'app-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.css']
})
export class ActionTableComponent {

  ColumnType = ColumnType;
  @Input() permiteVisualizar = true;
  @Input() permiteEditar = true;
  @Input() permiteEliminar = true;
  @Input() columnas: Columna<any>[] = [];
  @Input() filas: Filas<any>[] = [];
  @Input() mostrarTotal: boolean;

  @Output() visualizar = new EventEmitter();
  @Output() eliminar = new EventEmitter();
  @Output() editar = new EventEmitter();

  public get total(): number {
    let suma = 0;
    if (this.mostrarTotal) {
      this.filas.forEach(x => {
        suma = suma + x.valor[x.campoSumarizador];
      });
    }
    return suma;
  }

}




