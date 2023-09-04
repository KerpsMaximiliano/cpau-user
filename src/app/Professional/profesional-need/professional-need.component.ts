import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  buscando: boolean;
  video: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private siteLoader: SiteLoader) {}

  ngOnInit() {

    this.video = "<div style=\"padding: 56.25% 0 0 0; position: relative;\"> <video style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" src=\"https://player.vimeo.com/progressive_redirect/playback/432956089/rendition/540p/file.mp4?loc=external&signature=3304f4eac4878630468afd66f95ad405192c80a4f55e5e88521bc3a836cb5217\" preload=\"metadata\" autoplay=\"autoplay\" loop=\"loop\" muted=\"\"></video></div>";

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

  goto(): void {
    try {
      const element = document.getElementById('profesionalstag');
      if (element) { element.scrollIntoView(true); }
    } catch (e) { }
  }

  submit() {
    var filtros = this.armarParams();

    const url = this.router.createUrlTree([
      '/profesionales', filtros
    ]).toString();
    window.open(url, '_blank');
  }

onClear(){
  window.location.reload();
}

armarParams() : string {
  var params = "";

  console.log("profesion: " , this.form.value.profesion);
  if(this.form.value.profesion)
    params += "codigoProfesion=" + this.form.value.profesion;

  console.log("nameOrNumber: " , this.form.value.nameOrNumber);
  if(this.form.value.nameOrNumber)
    params += "?filtro=" + this.form.value.nameOrNumber;

  console.log("actividades: " , this.form.value.actividades);
  if(this.form.value.actividades.length > 0)
  {
    var actividades = "";

    this.form.value.actividades.forEach(element => {
      actividades += element + "-";
    });

    actividades = actividades.slice(0, -1);

    params += "?actividades=" + actividades;
  }

  console.log("obras: " , this.form.value.obras);
  if(this.form.value.obras.length > 0)
  {
    var obras = "";

    this.form.value.obras.forEach(element => {
      obras += element + "-";
    });

    obras = obras.slice(0, -1);

    params += "?obras=" + obras;
  }

  return params;
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
