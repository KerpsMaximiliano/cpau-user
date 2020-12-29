import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  collapsed: boolean;
  loading: boolean;
  public usuarioForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private usuarioService: UsuarioService) {
    this.usuarioForm = this.formBuilder.group({
      username: ['', {
        validators: [Validators.required,
                     Validators.maxLength(30),
                     Validators.minLength(6),
                     Validators.pattern('[a-z0-9.]*')],
        updateOn: 'blur'
      }],
    });
  }

  ngOnInit() {
    this.usuarioService.read().subscribe(usr => {
      this.usuarioForm.controls.username.patchValue(usr);
    });
  }

  onSave() {
    if (this.usuarioForm.valid) {
      this.loading = true;
      const request = this.usuarioForm.value as Usuario;

      this.usuarioService.update(request).subscribe(i => {
        if (i.success) {
          this.usuarioForm.patchValue(i.entity);
          this.toastr.success(null, 'Registro editado correctamente.');
          this.loading = false;
        } else {
          this.toastr.error(null, i.message);
          this.loading = false;
        }
      });
    } else {
      this.usuarioForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

}
