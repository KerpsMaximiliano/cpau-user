import { AuthenticationService } from '@app/_services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../stylesCustom/styles/form.css'],
})
export class RegisterComponent implements OnInit {
  isMatriculado = true;
  isValidate = true;
  showForm = false;
  emailPreregistro = '';
  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const uid = params['uid'];
      if(uid === undefined) {
        this.router.navigate(["/preregister"]);
      }
      this.authenticationService.preregisterconfirmacion(uid).subscribe(result => {
        if(result.success) {
          this.emailPreregistro = result.email;
          this.showForm = true;
        } else {
          this.router.navigate(["/preregistrofallido"]);
        }
       });
    }
    );
  }
}

