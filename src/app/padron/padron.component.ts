import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SiteLoader } from '@app/_services';

@Component({
  selector: 'app-padron',
  templateUrl: './padron.component.html',
  styleUrls: ['./padron.component.css']
})
export class PadronComponent implements OnInit {
  form: FormGroup;
  buscando: boolean;
  matriculasTipos: Array<any>[];
  profesionals: Array<any>[];

  constructor(private formBuilder: FormBuilder,
    private siteLoader: SiteLoader) { }

  ngOnInit() {
    this.siteLoader.getMatriculasTipos().subscribe(data => this.matriculasTipos = data);

    this.form = this.formBuilder.group({
      nameOrNumber: new FormControl(''),
      matriculaTipo: ['', [ Validators.required ] ],
    });
  }

  buscar() {
    if(this.form.value.matriculaTipo != '') {
      this.profesionals = undefined;
      this.buscando = true;
    }
  }

  submit() {
    if(this.form.value.matriculaTipo != '') {
      this.profesionals = undefined;
      this.buscando=true;
      this.siteLoader
      .getProfesionales(this.form.value.matriculaTipo, this.form.value.nameOrNumber,null,null)
      .subscribe(data =>
        {
          this.buscando=false;
          this.profesionals = data;
        } );
    }
    else
    alert('Seleccione un tipo de matrícula.')
  }

}
