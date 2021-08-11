import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models';
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
  @ViewChild('toggleButton', {static: false}) toggleButton: ElementRef;
  @ViewChild('menu', {static: false}) menu: ElementRef;
  @ViewChild('icon', {static: false}) icon: ElementRef;

  currentUser: User;
  private _openMenu: boolean;
  public get openMenu(): boolean {
    return this._openMenu;
  }
  public set openMenu(v: boolean) {
    this._openMenu = v;
  }

  public get urlPublica(): string {
    return `https://www.cpau.org/ficha/${this.currentUser.guid}`;
  }
  /**
   *
   */
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private renderer: Renderer2) {
        /**
         * This events get called by all clicks on the page
         */
         this.renderer.listen('window', 'click', (e: Event) => {
          /**
           * Only run when toggleButton is not clicked
           * If we don't check this, all clicks (even on the toggle button) gets into this
           * section which in the result we might never see the menu open!
           * And the menu itself is checked here, and it's where we check just outside of
           * the menu and button the condition abbove must close the menu
           */

         if (!this.toggleButton || !this.menu)
          return;

         if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement && e.target !== this.icon.nativeElement ){
             this.openMenu = false;
         }
     });
  }
  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  closeSession() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  collapse() {
    collapse();
    this.colapsarMenu.emit();
  }

  get isMatriculado() {
    return this.currentUser && this.currentUser.isMatriculado;
  }

}
