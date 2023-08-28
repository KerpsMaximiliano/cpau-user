import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Columna, Filas } from '@app/shared/models/ActionTable';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
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

  loading: boolean;
  collapsed: boolean;
  currentUser: User;
  public filas: Filas<Telefono>[] = [];
  public columnnas: Columna<Telefono>[];
  public telefonoForm: FormGroup;
  public tipos$ = this.telefonoService.tiposTelefonos$;
  public clases$:SelectItem[] = [{id: 'Fijo', nombre: 'Fijo'}, {id: 'Celular', nombre: 'Celular'}];
  public urlHelp = 'https://www.cpau.org/nota/34662';

  constructor(
    private formBuilder: FormBuilder,
    private telefonoService: TelefonoService,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private authenticationService: AuthenticationService
  ) {

    this.columnnas = [
      {
        id: 'tipoTelefono',
        titulo: 'Tipo'
      },
      {
        id: 'telefono',
        titulo: 'Número'
      },
      {
        id: 'celufijo',
        titulo: 'Clase'
      }
    ];

    this.telefonoForm = this.formBuilder.group({
      id: [],
      telefono: ['', {
        validators: [Validators.required, Validators.maxLength(10), Validators.minLength(10)],
        updateOn: 'blur'
      }],
      idTipoTelefono: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      celufijo: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }]
    });
  }

  ngOnInit() {
    this.initData();
    this.currentUser = this.authenticationService.currentUserValue;
  }
  initData() {
    this.filas = [];
    this.telefonoService.read().subscribe(telef => {
      telef.map(t => {
        this.filas = [
          ...this.filas,
          {
            valor: t,
            ocultarEliminar: t.idTipoTelefono === 1
          }
        ]
      });
    });
  }
  reload() {
    this.initData();
  }

  onEditar(ev: Telefono) {
    this.telefonoForm.patchValue(ev);
  }

  showConfirm(ev) {
    const disposable = this.dialogService.addDialog(ModalComponent, {
      title: 'Confirmar borrado',
      message: '¿Esta seguro que desea borrar el registro seleccionado?'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          this.telefonoService.delete(ev.id).subscribe(d => {
            if (d.success) {
              const index = this.filas.findIndex(f => f.valor.id === ev.id);
              this.filas.splice(index, 1);
              this.telefonoForm.reset();
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
    if (this.telefonoForm.valid) {
      this.loading = true;
      const telefonoUpdate = this.telefonoForm.value as TelefonoRequestModel;
      this.telefonoService.update(telefonoUpdate).subscribe(response => {
        if (response.success) {
          let index = this.filas.findIndex(fila => fila.valor.id === response.entity.id)
          this.filas[index].valor = response.entity;
          this.telefonoForm.reset();
          this.toastr.success(null, 'Registro editado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, response.message);
          this.loading = false;
        }
      });
    } else {
      this.telefonoForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  public agregarFila(): void {
    if (this.telefonoForm.valid) {
      this.loading = true;
      const request = this.telefonoForm.value as TelefonoRequestModel;

      this.telefonoService.insert(request).subscribe(response => {
        if (response.success) {
          this.filas = [
            ...this.filas,
            {
              valor: response.entity
            }
          ];
          this.telefonoForm.reset();

          this.toastr.success(null, 'Registro agregado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, response.message);
          this.loading = false;
        }
      });
    } else {
      this.telefonoForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }
  public cancelarFila(): void {
    this.telefonoForm.reset();
  }

  get isMatriculado() {
    return this.currentUser && this.currentUser.isMatriculado;
  }
}
