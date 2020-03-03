import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {
  isAuthenticated: boolean;
  lblAuthentication : string;
  lblUserName : string;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.updateControllers();
  }

  authentication() {

    if(!this.isAuthenticated) {
      this.router.navigate(['./login']);
      return;
    }

    this.authenticationService.logout();
    this.updateControllers();
  }

  private updateControllers() {
    this.isAuthenticated =  this.authenticationService.isAuthenticated();
    this.lblAuthentication = "LOGIN" ;//this.isAuthenticated ? "LOGOUT" : "LOGIN";

    if(this.authenticationService.currentUserValue)
      this.lblUserName =  this.authenticationService.currentUserValue.username;
    else
      this.lblUserName = '';
  }

}
