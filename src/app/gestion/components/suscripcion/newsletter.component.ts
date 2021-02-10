import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckBoxDataModel } from '@app/shared/components/checkbox-list/models/CheckboxList.model';
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
    this.suscripcionService.getSuscripciones().subscribe(suscripciones => {
      this.newsletter = suscripciones.filter(x => x.type === 0);
    });
    // this.actividadService.getObras().subscribe(obras => {
    //   this.obrasData = obras
    // })
  }

  public onSave(): void {
    this.loading = true;
    this.newsletterForm.value.newsletter
      .map((v, i) => this.newsletter[i].selected = v);

    console.log(this.newsletter);

    // const requestActividades = {
    //   id: selectedActividadesIds
    // } as ActividadProfesionalRequestModel



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
}
