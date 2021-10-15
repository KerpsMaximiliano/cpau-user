import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { MatriculaService } from '../matricula/services/matricula.service';
import { Inscripcion } from './model/inscripciones';
import { InscripcionesService } from './services/inscripciones.service';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

  get f() { return this.inscripcionesForm.controls; }

  collapsed: boolean;
  loading: boolean;
  mostrarGenerar: boolean;
  public filas: Filas<Inscripcion>[] = [];
  public columnnas: Columna<Inscripcion>[];
  
  public urlHelp = 'https://www.cpau.org/nota/34666';

  public inscripcionesForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private inscripcionesService: InscripcionesService,
              private toastr: ToastrService,
              private dialogService: DialogService,
              private matriculadoService: MatriculaService) {

    this.inscripcionesForm = this.formBuilder.group({
    });

    this.columnnas = [
      {
        id: 'name',
        titulo: 'Nombre'
      }
    ];
  }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.filas = [];
    this.inscripcionesService.getAll()
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
  
  imprimirCertificado(ev: Inscripcion) {
    window.open("https://www.cpau.org/formularios/" + ev.id, "_blank");
    //this.matriculadoService.imprimirCertificado(ev.id, ev.codigo.toString());
  }

  protected reload() {
    this.initData();
  }
}
