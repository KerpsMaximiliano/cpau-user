import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services";

@Component({
  selector: "app-header-home",
  templateUrl: "./header-home.component.html",
  styleUrls: ["./header-home.component.css"],
})
export class HeaderHomeComponent implements OnInit {
  isAuthenticated: boolean;
  lblAuthentication = "LOGIN";
  lblUserName: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.updateControllers();
  }

  authentication() {
    if (!this.isAuthenticated) {
      this.router.navigate(["./login"]);
      return;
    }

    window.location.href = `/Perfil?tkn=${
      JSON.parse(localStorage.getItem("currentUser")).token
    }`;
    this.updateControllers();
  }

  private updateControllers() {
    this.authenticationService.isAuthenticated().subscribe((data) => {
      this.isAuthenticated = localStorage.getItem("currentUser") && data.ret;

      this.lblAuthentication = this.isAuthenticated ? "PERFIL" : "LOGIN";

      if (!this.isAuthenticated) {
        this.authenticationService.logout();
      }

      if (this.authenticationService.currentUserValue)
        this.lblUserName = this.authenticationService.currentUserValue.username;
      else this.lblUserName = "";
    });
  }
}
