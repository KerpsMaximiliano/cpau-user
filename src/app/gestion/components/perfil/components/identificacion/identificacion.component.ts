import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {


  public identificacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.identificacionForm = this.formBuilder.group({
      nombre: [],
      apellido: [],
      sexo: [],
      tipoDoc: [],
      nroDoc: [],
      fechaNac: [],
      paisNac: []
    });
  }

  ngOnInit() {
  }



}
