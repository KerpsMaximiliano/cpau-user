import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
declare var $: any;
declare function collapse();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {

  @Output() colapsarMenu = new EventEmitter();

  /**
   *
   */
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }
  ngOnInit(): void {
    //
  }
  closeSession() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  collapse() {
    collapse();
    this.colapsarMenu.emit();
  }

}
