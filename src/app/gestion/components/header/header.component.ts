import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent {

  @Output() colapsarMenu = new EventEmitter();

  /**
   *
   */
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }
  closeSession() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
