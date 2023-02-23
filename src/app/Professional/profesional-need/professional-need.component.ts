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
  profesionals: Array<any>[];
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
    this.goto();
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
