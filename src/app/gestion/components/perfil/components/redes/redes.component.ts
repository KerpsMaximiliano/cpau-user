import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '@app/gestion/shared/validators/CustomValidator';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Columna, Filas } from '@app/shared/models/ActionTable';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Redes, RedesRequestModel } from './models/redes.model';
import { RedesService } from './service/redes.service';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit {
  get f() { return this.redesForm.controls; }

  public filas: Filas<Redes>[] = [];
  public columnnas: Columna<Redes>[];
  public redesForm: FormGroup;
  public tipos$ = this.redesService.tiposRedes$;
  loading: boolean;
  collapsed: boolean;
  public urlHelp = 'https://www.cpau.org/nota/34663';

  constructor(
    private formBuilder: FormBuilder,
    private redesService: RedesService,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {

    this.columnnas = [
      {
        id: 'tipoRedSocial',
        titulo: 'Red'
      },
      {
        id: 'url',
        titulo: 'Url'
      }
    ];

    this.redesForm = this.formBuilder.group({
      id: [],
      url: ['', {
        validators: [
          Validators.required,
          CustomValidator.urlValidator
        ],
        updateOn: 'blur'
      }],
      idTipoRedSocial: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
    });
  }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.filas = [];
    this.redesService.read().subscribe(redes => {
      redes.map(t => {
        this.filas = [
          ...this.filas,
          {
            valor: t
          }
        ]
      });
    });
  }
  reload() {
    this.initData();
  }

  onEditar(ev) {
    this.redesForm.patchValue(ev);
  }

  showConfirm(ev) {
    const disposable = this.dialogService.addDialog(ModalComponent, {
      title: 'Confirmar borrado',
      message: '¿Esta seguro que desea borrar el registro seleccionado?'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          this.redesService.delete(ev.id).subscribe(d => {
            if (d.success) {
              const index = this.filas.findIndex(f => f.valor.id === ev.id);
              this.filas.splice(index, 1);
              this.redesForm.reset();
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

  public editarFila(): void {
    if (this.redesForm.valid) {
      this.loading = true;
      const request = this.redesForm.value as RedesRequestModel;

      this.redesService.update(request).subscribe(i => {
        if (i.success) {
          const index = this.filas.findIndex(f => f.valor.id === request.id);
          this.filas[index].valor = i.entity;
          this.redesForm.reset();
          this.toastr.success(null, 'Registro editado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, i.message);
          this.loading = false;
        }
      });
    } else {
      this.redesForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  public agregarFila(): void {
    if (this.redesForm.valid) {
      this.loading = true;
      const request = this.redesForm.value as RedesRequestModel;

      this.redesService.insert(request).subscribe(i => {
        if (i.success) {
          this.filas = [
            ...this.filas,
            {
              valor: i.entity
            }
          ];
          this.redesForm.reset();

          this.toastr.success(null, 'Registro agregado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, i.message);
          this.loading = false;
        }
      });
    } else {
      this.redesForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }
  public cancelarFila(): void {
    this.redesForm.reset();
  }
}
