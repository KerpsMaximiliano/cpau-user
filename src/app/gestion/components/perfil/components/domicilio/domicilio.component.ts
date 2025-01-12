import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Domicilio } from './model/domicilio.model';
import { DomicilioService } from './service/domicilio.service';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  get f() { return this.domicilioForm.controls; }

  collapsed: boolean;
  loading: boolean;
  currentUser: User;
  public filas: Filas<Domicilio>[] = [];
  public columnnas: Columna<Domicilio>[];

  public tiposDomicilios: SelectItem[];
  public domicilioForm: FormGroup;
  public urlHelp = 'https://www.cpau.org/nota/34660';

  constructor(private formBuilder: FormBuilder,
              private domicilioService: DomicilioService,
              private toastr: ToastrService,
              private dialogService: DialogService,
              private authenticationService: AuthenticationService) {

    this.domicilioForm = this.formBuilder.group({
      id: [],
      calle: ['', {
        validators: [Validators.required, Validators.maxLength(100), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      altura: ['', {
        validators: [Validators.required, Validators.maxLength(7), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      idTipoDomicilio: ['', {
        validators: [Validators.required],
      }],
      piso: ['', {
        validators: [Validators.maxLength(2)],
        updateOn: 'blur'
      }],
      depto: ['', {
        validators: [Validators.maxLength(20), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      localidad: ['', {
        validators: [Validators.required, Validators.maxLength(100), Validators.minLength(1)],
        updateOn: 'blur'
      }],
      codigoPostal: ['', {
        validators: [Validators.required, Validators.maxLength(8),
        Validators.minLength(4), Validators.pattern('[A-Za-z]{0,1}[0-9]{4}[A-Za-z]{0,3}$')],
        updateOn: 'blur'
      }]
    });

    this.columnnas = [
      {
        id: 'tipoDomicilio',
        titulo: 'Tipo'
      },
      {
        id: 'calle',
        titulo: 'Calle'
      },
      {
        id: 'altura',
        titulo: 'Altura'
      },
      {
        id: 'piso',
        titulo: 'Piso'
      },
      {
        id: 'depto',
        titulo: 'Departamento'
      },
      {
        id: 'localidad',
        titulo: 'Localidad'
      },
      {
        id: 'codigoPostal',
        titulo: 'Código Postal'
      }
    ];

    this.domicilioService.tiposDomicilios$.subscribe(s => this.tiposDomicilios = s);
  }

  ngOnInit() {
    this.initData();

    this.currentUser = this.authenticationService.currentUserValue;
  }
  initData() {
    this.filas = [];
    this.domicilioService.getAll()
    .subscribe(d => {
      d.map(x => {
        this.filas = [
          ...this.filas,
          {
            valor: x,
            ocultarEliminar: x.idTipoDomicilio === 1
          }
        ];
      });
    });
  }
  reload() {
    this.initData();
  }

  onEditar(ev) {
    console.log('el evento', ev);

    this.domicilioForm.patchValue(ev);
  }

  showConfirm(ev) {
    const disposable = this.dialogService.addDialog(ModalComponent, {
      title: 'Confirmar borrado',
      message: '¿Esta seguro que desea borrar el registro seleccionado?'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          this.domicilioService.delete(ev.id).subscribe(d => {
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

  public editarFila(): void {
    if (this.domicilioForm.valid) {
      this.loading = true;
      const fila = new Domicilio(this.domicilioForm.value, this.tiposDomicilios);

      this.domicilioService.update(fila).subscribe(i => {
        if (i.success) {
          const index = this.filas.findIndex(f => f.valor.id === fila.id);
          this.filas[index].valor = fila;
          this.domicilioForm.reset();
          this.toastr.success(null, 'Registro editado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, i.message);
          this.loading = false;
        }
      });
    } else {
      this.domicilioForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  public agregarFila(): void {
    if (this.domicilioForm.valid) {
      this.loading = true;
      const fila = new Domicilio(this.domicilioForm.value, this.tiposDomicilios);

      this.domicilioService.insert(fila).subscribe(i => {
        if (i.success) {
          this.filas = [
            ...this.filas,
            {
              valor: i.entity
            }
          ];
          this.domicilioForm.reset();

          this.toastr.success(null, 'Registro agregado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, i.message);
          this.loading = false;
        }
      });
    } else {
      this.domicilioForm.markAllAsTouched();
      console.log(this.domicilioForm);

      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }
  public cancelarFila(): void {
    this.domicilioForm.reset();
  }

  get isMatriculado() {
    return this.currentUser && this.currentUser.isMatriculado;
  }
}
