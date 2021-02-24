import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizacionEmailService } from './service/actualizacion-email.service';

@Component({
  selector: 'app-actualizacion-email',
  templateUrl: './actualizacion-email.component.html'
})
export class ActualizacionEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private actualizacionEmailService: ActualizacionEmailService,
              private router: Router){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const uid = params['uid'];
      const contactId = params['contactId'];
      if(uid === undefined) {
        this.router.navigate(["/"]);
      }
      this.actualizacionEmailService.emailconfirmacion(uid, contactId).subscribe(result => {
        if(result.success) {
          this.router.navigate(["/actualizacion-email-valida"]);
        } else {
          this.router.navigate(["/actualizacion-email-invalida"]);
        }
       });
    }
    );
  }

}
