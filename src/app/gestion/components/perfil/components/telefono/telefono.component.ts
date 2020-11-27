import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columna, Filas } from '@app/shared/Models/ActionTable';
import { Telefono } from './models/telefono.model';
import { TelefonoService } from './service/telefono.service';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})
export class TelefonoComponent implements OnInit {


  public filas: Filas<Telefono>[] = [];
  public columnnas: Columna<Telefono>[];
  public telefonoForm: FormGroup;
  public tipos$ = this.telefonoService.tiposTelefonos$;

  constructor(
    private formBuilder: FormBuilder,
    private telefonoService: TelefonoService
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

  onClick() {
    // this.identificacionForm.markAllAsTouched();
    // console.log(this.identificacionForm);
  }

  onEditar(ev) {
    console.log(ev);
  }

  onEliminar(ev) {
    console.log(ev);
  }

  onVisualizar(ev) {
    console.log(ev);
  }
  public agregarFila(): void {
    this.filas = [
      ...this.filas,
      // {
      //   valor: {
      //   }
      // }
    ];
  }
}
