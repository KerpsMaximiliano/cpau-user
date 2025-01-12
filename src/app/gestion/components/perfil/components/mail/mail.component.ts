import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Mail, MailRequestModel } from './models/mail.model';
import { MailService } from './services/mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  get f() { return this.mailForm.controls; }

  loading: boolean;
  collapsed: boolean;
  currentUser: User;
  public filas: Filas<Mail>[] = [];
  public columnnas: Columna<Mail>[];
  public mailForm: FormGroup;
  public tipos$ = this.mailService.tiposMails$;
  public urlHelp = 'https://www.cpau.org/nota/34661';

  constructor(
    private formBuilder: FormBuilder,
    private mailService: MailService,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private authenticationService: AuthenticationService
  ) {

    this.columnnas = [
      {
        id: 'tipoEmail',
        titulo: 'Tipo'
      },
      {
        id: 'email',
        titulo: 'Email'
      }
    ];

    this.mailForm = this.formBuilder.group({
      id: [],
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }],
      idTipoEmail: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
    });
  }

  ngOnInit() {
    this.initData();

    this.currentUser = this.authenticationService.currentUserValue;
  }
  initData() {
    this.filas = [];
    this.mailService.read().subscribe(mail => {
      mail.map(t => {
        this.filas = [
          ...this.filas,
          {
            valor: t,
            ocultarEliminar: t.idTipoEmail === 1,
            ocultarPersonalizado: t.idTipoEmail === 1
          }
        ];
      });
    });
  }
  public reload() {
    this.initData();
  }

  onEditar(ev: Mail) {
    this.mailForm.patchValue(ev);
  }

  setearComoParticular(ev: Mail) {
    this.mailService.setearParticular(ev.id).subscribe(response => {
      if (response.success) {
        this.reload();
      } else {
        this.toastr.error(null, response.message);
      }
    });
  }

  showConfirm(ev) {
    const disposable = this.dialogService.addDialog(ModalComponent, {
      title: 'Confirmar borrado',
      message: '¿Esta seguro que desea borrar el registro seleccionado?'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          this.mailService.delete(ev.id).subscribe(d => {
            if (d.success) {
              const index = this.filas.findIndex(f => f.valor.id === ev.id);
              this.filas.splice(index, 1);
              this.mailForm.reset();
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

    if (this.mailForm.valid) {
      this.loading = true;
      const mailUpdate = this.mailForm.value as MailRequestModel;
      this.mailService.update(mailUpdate).subscribe(response => {
        if (response.success) {
          let index = this.filas.findIndex(fila => fila.valor.id === response.entity.id)
          this.filas[index].valor = response.entity;
          this.mailForm.reset();
          this.toastr.success(null, response.message);
          this.loading = false;
        } else {
          this.toastr.error(null, response.message);
          this.loading = false;
        }
      });
    } else {
      this.mailForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  public agregarFila(): void {

    if (this.mailForm.valid) {
      this.loading = true;
      const request = this.mailForm.value as MailRequestModel;

      this.mailService.insert(request).subscribe(response => {
        if (response.success) {
          this.filas = [
            ...this.filas,
            {
              valor: response.entity
            }
          ];
          this.mailForm.reset();

          this.toastr.success(null, 'Registro agregado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, response.message);
          this.loading = false;
        }
      });
    } else {
      this.mailForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }

  }
  public cancelarFila(): void {
    this.mailForm.reset();
  }

  get isMatriculado() {
    return this.currentUser && this.currentUser.isMatriculado;
  }
}
