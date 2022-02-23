import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IdentificacionService } from '../identificacion/service/identificacion.service';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {

  public urlHelp = 'https://www.cpau.org/nota/34659';
  collapsed: boolean;
  public fotosForm: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private identificacionService: IdentificacionService) {
    this.fotosForm = this.fb.group({
      politica: [],
      ficha: [false],
      credencial: [false],
      perfil: [false],
      id: []
    });
  }

  public ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.identificacionService.readFoto().subscribe(f => {
      this.fotosForm.patchValue(f.entity);
      if (this.hasPolicy) {
        this.fotosForm.controls['perfil'].enable();
        this.fotosForm.controls['credencial'].enable();
        this.fotosForm.controls['ficha'].enable();
      } else {
        this.fotosForm.controls['perfil'].disable();
        this.fotosForm.controls['credencial'].disable();
        this.fotosForm.controls['ficha'].disable();
      }
    });
  }

  protected reload() {
    this.initData();
  }

  public cancelarFila(): void {
    this.fotosForm.reset();
    this.initData();
  }

  onSave() {
    if (this.fotosForm.valid) {
      this.loading = true;
      this.fotosForm.markAllAsTouched();

      this.identificacionService.updateFoto(this.fotosForm.value).subscribe(response => {
        if (response.success) {
          this.toastr.success('Actualizacion realizada con exito');
          this.loading = false;
          location.reload(true);
        } else {
          this.toastr.error(response.message);
          this.loading = false;
        }
      });
    } else {
      this.fotosForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  changeCheck() {
    if (!this.hasPolicy) {
      this.fotosForm.controls['perfil'].enable();
      this.fotosForm.controls['credencial'].enable();
      this.fotosForm.controls['ficha'].enable();
    } else {
      this.fotosForm.controls['perfil'].disable();
      this.fotosForm.controls['credencial'].disable();
      this.fotosForm.controls['ficha'].disable();
      this.fotosForm.controls['perfil'].setValue(false);
      this.fotosForm.controls['credencial'].setValue(false);
      this.fotosForm.controls['ficha'].setValue(false);
    }
  }

  
  public get hasPolicy() : boolean {
    return this.fotosForm.controls.politica.value
  }
  
}
