import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentificacionService } from './service/identificacion.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {


  public identificacionForm: FormGroup;

  public countries$ = this.identificacionService.countries$;

  public docTypes$ = this.identificacionService.docTypes$;

  constructor(
    private formBuilder: FormBuilder,
    private identificacionService: IdentificacionService) {

    this.identificacionForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(2)]],
      sexo: ['', [Validators.required]],
      tipoDoc: [],
      nroDoc: ['', [Validators.required, Validators.max(99999999), Validators.min(1000000)]],
      fechaNac: [],
      paisNac: []
    });
  }

  ngOnInit() {
  }

  onClick() {
    console.log(this.identificacionForm.value);
  }
}
