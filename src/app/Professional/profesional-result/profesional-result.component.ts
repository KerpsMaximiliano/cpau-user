import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteLoader } from '@app/_services';

@Component({
  selector: 'app-profesional-result',
  templateUrl: './profesional-result.component.html',
  styleUrls: ['./profesional-result.component.css']
})
export class ProfesionalResultComponent implements OnInit {

  profesionals: Array<any>[];
  filtros: Array<string> = [];
  profesion = "";
  nameOrNumber = "";
  actividades = [];
  obras = [];

  disciplinaFiltro: string;
  nombreMatriculaFiltro: string;
  actividadesFiltro: string;
  obrasFiltro: string;


  constructor(private router: ActivatedRoute, private siteLoader: SiteLoader,) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      
      const parametros = params['params'];
      var valores = String(parametros).split('?');

      valores.forEach(element => {
        var parametro = element.split('=');

        if(parametro[0] == "codigoProfesion")
          this.profesion = parametro[1];
        else if(parametro[0] == "filtro")
          this.nameOrNumber = parametro[1];
        else if(parametro[0] == "actividades")
          this.actividades = parametro[1].split("-");
        else if(parametro[0] == "obras")
          this.obras = parametro[1].split("-");

      });

      console.log("obras",  this.obras)

      this.siteLoader.getProfesionales(this.profesion, this.nameOrNumber,this.actividades,this.obras).subscribe(data => {
        this.profesionals = data;
      });

      this.buscarNombresFiltros();
      
    });
  }

  buscarNombresFiltros() {

    if(this.profesion == "ARQ"){
      this.filtros.push("Disciplina: Arquitectura");
      this.disciplinaFiltro = "Arquitectura";
    } else if(this.profesion == "PAI") {
      this.filtros.push("Disciplina: Planificación y Diseño del paisaje");
      this.disciplinaFiltro = "Planificación y Diseño del paisaje";
    } else if(this.profesion == "DSI") {
      this.filtros.push("Disciplina: Diseño de Interiores");
      this.disciplinaFiltro = "Diseño de Interiores";
    }
    
    if(this.nameOrNumber) {
      this.filtros.push("Nombre o matricula:" + this.nameOrNumber);
      this.nombreMatriculaFiltro = this.nameOrNumber
    }
    

    if(this.actividades.length > 0){
      this.siteLoader.getActividadesByIds(this.actividades.join(", ")).subscribe(data => {
        var nombres = "";
        data.forEach((element, index) => {
          nombres += element.nombre;
          if (index < data.length - 1) {
            nombres += " - ";
          }
        });
        this.filtros.push("Actividades: " + nombres);
        this.actividadesFiltro = nombres;
      });
    }

    if(this.obras.length > 0){
      this.siteLoader.getObraDestinoByIds(this.obras.join(", ")).subscribe(data => {
        var nombres = "";
        data.forEach((element, index) => {
          nombres += element.nombre;
          if (index < data.length - 1) {
            nombres += " - ";
          }
        });
        this.filtros.push("Obras: " + nombres);
        this.obrasFiltro = nombres;
      });
    }
     
    
  }

}
