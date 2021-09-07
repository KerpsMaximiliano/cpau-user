import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CredencialService } from './services/credencial.service';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {

  collapsed: boolean;
  loading: boolean;
  mostrarGenerar: boolean;
  public urlHelp = 'https://cpau.org/Content/institucional/%2F%2Fpreguntas-frecuentes%2Fherramientas-online';

  constructor(private credencialService: CredencialService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.credencialService.allowGenerate()
    .subscribe(g => {
      this.mostrarGenerar = g;
    });
    
    //this.mostrarGenerar = true;
  }

  imprimirCredencial() {
    this.credencialService.imprimirCertificado();
  }

}
