import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Suscripcion } from './Models/suscipcion.model';
import { SuscripcionService } from './services/suscripcion.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  collapsed: boolean;
  loading: boolean;

  public newsletterForm: FormGroup;


  public newsletter: Suscripcion[];


  constructor(private formBuilder: FormBuilder,
    private suscripcionService: SuscripcionService,
    private toastr: ToastrService,

  ) {

    this.newsletterForm = this.formBuilder.group({
    })
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.suscripcionService.getSuscripciones().subscribe(suscripciones => {
      this.newsletter = suscripciones.filter(x => x.type === 0);
    });
  }

  public onSave(): void {
    this.loading = true;
    this.newsletterForm.value.newsletter
      .map((v, i) => this.newsletter[i].selected = v);

    console.log(this.newsletter);

    this.suscripcionService.saveNewsletter(this.newsletter)
      .subscribe(response => {
        if (response.success) {

          this.toastr.success('Actualizacion realizada con exito');
          this.loading = false;
        } else {
          this.toastr.error(response.message);
          this.loading = false;
        }
      })
  }
  
  public cancelarFila(): void {
    this.newsletterForm.reset();
    this.loadData();
  }
}
