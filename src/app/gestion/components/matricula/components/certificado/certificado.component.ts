import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { MatriculaService } from '../../services/matricula.service';
import { Certificado } from './model/certificado';
import { CertificadoService } from './services/certificado.service';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  get f() { return this.certificadoForm.controls; }

  collapsed: boolean;
  loading: boolean;
  mostrarGenerar: boolean;
  public filas: Filas<Certificado>[] = [];
  public columnnas: Columna<Certificado>[];
  public urlHelp = 'https://www.cpau.org/nota/35451';

  public certificadoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private certificadoService: CertificadoService,
              private toastr: ToastrService,
              private dialogService: DialogService,
              private matriculadoService: MatriculaService) {

    this.certificadoForm = this.formBuilder.group({
      // id: [],
      // codigoCertificado: ['CMW', {
      //   validators: [Validators.required, Validators.maxLength(100), Validators.minLength(1)],
      //   updateOn: 'blur'
      // }],
      // fechaHora: [new Date(), {
      //   validators: [Validators.required],
      //   updateOn: 'blur'
      // }],
    });

    this.columnnas = [
      {
        id: 'codigo',
        titulo: 'Código certificado'
      },
      {
        id: 'fechaHora',
        titulo: 'Fecha'
      },
    ];
  }

  ngOnInit() {
    this.certificadoService.allowGenerate()
    .subscribe(g => {
      this.mostrarGenerar = g;
    });
    this.initData();
  }
  initData() {
    this.filas = [];
    this.certificadoService.getAll()
    .subscribe(d => {
      d.map(x => {
        this.filas = [
          ...this.filas,
          {
            valor: x
          }
        ];
      });
    });
  }

  public agregarFila(): void {
    if (this.certificadoForm.valid) {
      this.loading = true;
      // const fila = new Certificado(this.certificadoForm.value);

      this.certificadoService.insert().subscribe(i => {
        if (i.success) {
          this.filas = [
            ...this.filas,
            {
              valor: i.entity
            }
          ];

          this.toastr.success(null, 'Registro agregado correctamente.');
          this.loading = false;
          this.initData();
        } else {
          this.toastr.error(null, i.message);
          this.loading = false;
        }
      });
    } else {
      this.certificadoForm.markAllAsTouched();
      console.log(this.certificadoForm);

      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }
  // public cancelarFila(): void {
  //   this.certificadoForm.controls.fechaHora.reset();
  // }

  imprimirCertificado(ev: Certificado) {
    this.matriculadoService.imprimirCertificado(ev.id, ev.codigo.toString());
  }

  reload() {
    this.initData();
  }
}
