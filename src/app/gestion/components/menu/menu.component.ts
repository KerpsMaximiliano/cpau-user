import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Role, User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { MatriculaService } from '../matricula/services/matricula.service';
import { Identificacion } from '../perfil/components/identificacion/model/identificacion.model';
import { IdentificacionService } from '../perfil/components/identificacion/service/identificacion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MenuComponent implements OnInit {

  @Output() colapsarMenu = new EventEmitter();

  colapsado: boolean[] = [];
  perfil: Identificacion;
  currentUser: User;

  constructor(private identificacionService: IdentificacionService,
    private authenticationService: AuthenticationService,
    private matriculadoService: MatriculaService) { }

  ngOnInit(): void {
    this.identificacionService.read().subscribe(identificacion => {
      this.identificacionService.currentIdentificacionValue = identificacion;
    });

    this.identificacionService.readImage().subscribe(i => {
      console.log(i);
    });

    this.identificacionService.getCurrentIdentificacionValue().subscribe(x => this.perfil = x);

    this.currentUser = this.authenticationService.currentUserValue;
  }

  colapsar(i: number) {
    this.colapsado[i] = !this.colapsado[i];
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMatriculado() {
    return this.currentUser && this.currentUser.isMatriculado;
  }

  imprimirCertificado() {
    this.matriculadoService.imprimirCertificado();
  }

}
