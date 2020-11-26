import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@app/gestion/shared/Models/SelectItem.model';
import { Fila, Valores } from '@app/shared/Models/ActionTable';
import { Observable } from 'rxjs';
import { IdentificacionService } from './service/identificacion.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentificacionComponent implements OnInit {


  public filas: Fila[] = [];

  public identificacionForm: FormGroup;

  public countries$: Observable<SelectItem[]>;

  public docTypes$: Observable<SelectItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    private identificacionService: IdentificacionService) {

    this.identificacionForm = this.formBuilder.group({
      nombre: ['', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(2)],
        updateOn: 'blur'
      }],
      apellido: ['', {
        validators: [Validators.required, Validators.maxLength(200), Validators.minLength(2)],
        updateOn: 'blur'
      }],
      sexo: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      tipoDoc: [],
      nroDoc: ['', {
        validators: [Validators.required, Validators.max(99999999), Validators.min(1000000)],
        updateOn: 'blur'

      }],
      fechaNac: [],
      paisNac: []
    });

    this.countries$ = this.identificacionService.countries$;
    this.docTypes$ = this.identificacionService.docTypes$;
  }

  ngOnInit() {
    const fila = new Fila();
    fila.valores.push(new Valores({valor: '1'}));
    fila.valores.push(new Valores({valor: 'Bootstrap 4 CDN and Starter Template'}));
    fila.valores.push(new Valores({valor: 'Cristina'}));
    fila.valores.push(new Valores({valor: '2.846'}));
    this.filas.push(fila);
  }

  onClick() {
    this.identificacionForm.markAllAsTouched();
    console.log(this.identificacionForm);
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
}
