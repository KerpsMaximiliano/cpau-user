import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Role, User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { environment } from '@environments/environment';
import { MatriculaService } from '../matricula/services/matricula.service';
import { Identificacion } from '../perfil/components/identificacion/model/identificacion.model';
import { IdentificacionService } from '../perfil/components/identificacion/service/identificacion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Output() colapsarMenu = new EventEmitter();

  colapsado: boolean[] = [];
  perfil: Identificacion;
  currentUser: User;
  imgSrc: string | ArrayBuffer = "";
  closeMenu: boolean;

  constructor(private identificacionService: IdentificacionService,
              private authenticationService: AuthenticationService) { }
  ngAfterViewInit(): void {
    this.colapsado[0] = true;
  }

  ngOnInit(): void {
    this.identificacionService.read().subscribe(identificacion => {
      this.identificacionService.currentIdentificacionValue = identificacion;
    });

    this.identificacionService.readImage().subscribe(i => {
      if (i.success) {
        this.imgSrc = 'data:image/jpg;base64,' + i.entity.image;
      }
    });

    this.identificacionService.getCurrentIdentificacionValue().subscribe(x => this.perfil = x);

    this.currentUser = this.authenticationService.currentUserValue;
  }

  colapsar(i: number) {
    this.closeMenu = false;
    for (let x = 0; x < this.colapsado.length; x++) {
      this.colapsado[x] = false;
    }
    this.colapsado.forEach(f => f = true);
    this.colapsado[i] = !this.colapsado[i];
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMatriculado() {
    return this.currentUser && this.currentUser.isMatriculado;
  }

  get storeUrl() {
    return `${environment.storeUrl}?tkn=${localStorage.getItem('jwt_token')}`;
  }
}
