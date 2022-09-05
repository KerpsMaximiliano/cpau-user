import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
  hasImage: boolean;

  constructor(private identificacionService: IdentificacionService,
              private authenticationService: AuthenticationService,
              private router: Router) { }
  ngAfterViewInit(): void {
    this.colapsado[0] = true;
    let url = this.router.url.split('/');
    if(url[url.length - 1] == "inscripciones") {
      this.colapsar(5);
    } else if (url[url.length - 2] == "seguridad") {
      this.colapsar(6);
    } else if (url[url.length - 2] == "suscripciones") {
      this.colapsar(3);
    } else if (url[url.length - 2] == "store") {
      this.colapsar(4);
    } else if (url[url.length - 2] == "perfil") {
      this.colapsar(0);
    } else if (url[url.length - 2] == "matricula") {
      this.colapsar(1);
    } else if (url[url.length - 2] == "oferta-servicio") {
      this.colapsar(2);
    }
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

    this.identificacionService.hasImage().subscribe(i => {
        this.hasImage = i.success && i.entity.hasImage;
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
    return `${environment.storeUrl}?token=${localStorage.getItem('jwt_token')}`;
  }

  get adminUrl() {
    return environment.adminUrl;
  }
}
