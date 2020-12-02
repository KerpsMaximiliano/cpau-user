import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Telefono, TelefonoRequestModel } from './models/telefono.model';
import { TelefonoService } from './service/telefono.service';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})
export class TelefonoComponent implements OnInit {

  get f() { return this.telefonoForm.controls; }

  collapsed: boolean;
  public filas: Filas<Telefono>[] = [];
  public columnnas: Columna<Telefono>[];
  public telefonoForm: FormGroup;
  public tipos$ = this.telefonoService.tiposTelefonos$;

  constructor(
    private formBuilder: FormBuilder,
    private telefonoService: TelefonoService,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {

    this.columnnas = [
      {
        id: 'tipoDescripcion',
        titulo: 'tipo'
      },
      {
        id: 'numero',
        titulo: 'Numero'
      }
    ];

    this.telefonoForm = this.formBuilder.group({
      id: [],
      numero: ['', {
        validators: [Validators.required, Validators.maxLength(10), Validators.minLength(10)],
        updateOn: 'blur'
      }],
      tipo: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
    });
  }

  ngOnInit() {
  }

  onEditar(ev) {
    this.telefonoService.update({});
  }

  showConfirm(ev) {
    const disposable = this.dialogService.addDialog(ModalComponent, {
        title: 'Confirmar borrado',
        message: '¿Esta seguro que desea borrar el registro seleccionado?'})
        .subscribe((isConfirmed) => {
            // We get dialog result
            if (isConfirmed) {
                this.telefonoService.delete(ev.id).subscribe(d => {
                  if (d.success) {
                    const index = this.filas.findIndex(f => f.valor.id === ev.id);
                    this.filas.splice(index, 1);
                    this.toastr.success(null, 'Registro eliminado correctamente.');
                  } else {
                    this.toastr.error(null, d.message);
                  }
              });
            }
        });
    // We can close dialog calling disposable.unsubscribe();
    // If dialog was not closed manually close it by timeout
    setTimeout(() => {
        disposable.unsubscribe();
    }, 10000);
  }

  async onEliminar(ev) {
    this.showConfirm(ev);
  }

  onVisualizar(ev) {
    console.log(ev);
  }

  public editarFila(): void {
    //
  }

  public agregarFila(): void {

    const request = this.telefonoForm.value as TelefonoRequestModel;
    this.telefonoService.insert(request).subscribe(telefono => {
      this.filas = [
        ...this.filas,
        {
          valor: {
            ...telefono
          }
        }
      ];
    });
  }
}
