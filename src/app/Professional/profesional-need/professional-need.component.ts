import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SiteLoader } from '@app/_services';

@Component({
  selector: 'app-professional-need',
  templateUrl: './professional-need.component.html',
  styleUrls: ['./professional-need.component.css']
})
export class ProfessionalNeedComponent implements OnInit {
  form: FormGroup;
  obras: Array<any>[];
  actividades: Array<any>[];
  profesionals: Array<any>[];
  buscando: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private siteLoader: SiteLoader) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      profesion: 'ARQ',
      nameOrNumber: new FormControl(''),
      obras: new FormArray([]),
      actividades: new FormArray([]),
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.siteLoader.getActividades().subscribe(data => this.actividades = data);

    this.siteLoader.getObraDestino().subscribe(data => this.obras = data);
  }

  onSelectAcividad(item) {
    this.eventCheckbox(this.form.value.actividades,item);
  }

  onSelectObra(item) {
    this.eventCheckbox(this.form.value.obras,item);
  }

  onSelectProfesion(value) {
    this.form.value.profesion = value;
  }

  submit() {
    this.buscando=true;
    this.siteLoader
    .getProfesionales(this.form.value.profesion, this.form.value.nameOrNumber,this.form.value.actividades,this.form.value.obras)
    .subscribe(data =>
      {
        this.buscando=false;
        this.profesionals = data;
      } );
  }

onClear(){
  window.location.reload();
}

  private eventCheckbox(list, item) {
      const index = list.indexOf(item.id, 0);
      if (index > -1) {
        list.splice(index, 1);
      }
      else
      list.push(item.id);
  }
}
