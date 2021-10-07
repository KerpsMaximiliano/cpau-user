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
      // const uid = params['uid'];
      // const contactId = params['ci'];

      const uid: string = this.router.url.split('uid=')[1].split('&')[0];
      const contactId: string = this.router.url.split('ci=').reverse()[0];


      if(uid === undefined) {
        this.router.navigate(["/"]);
      }
      this.actualizacionEmailService.emailconfirmacion(this.parse(uid), this.parse(contactId)).subscribe(result => {
        if(result.success) {
          this.router.navigate(["/actualizacion-email-valida"]);
        } else {
          this.router.navigate(["/actualizacion-email-invalida"]);
        }
       });
    }
    );
  }

  parse(url: string): string {
    url = url.replace(/\%/g, '%25');
    return url;
  }

}
