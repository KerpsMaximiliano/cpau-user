import { ActivatedRoute, Router } from '@angular/router';
import { PasswordMustMatchValidator } from '@app/_validators/passwordMustMatch.validator';
import { CuitValidator } from '@app/_validators/cuit.validator';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ListConstantService } from '@app/_services/listconstant.service';
import { RegisterNoMatriculado } from '@app/_models/register-nomatriculado.model';
import { AuthenticationService } from '@app/_services';
import { ValueMustMatchValidator } from '@app/_validators/valueMustMatch.validator';
declare var $: any;
@Component({
  selector: 'app-register-nomatriculado',
  templateUrl: './register-nomatriculado.component.html',
  styleUrls: ['./register-nomatriculado.component.css']
})
export class RegisterNomatriculadoComponent implements OnInit {
  @Input() emailPreregistro: string;
  formNoMatriculado: FormGroup;
  tiposDocumento = [];
  loading= false;
  modalErrorMessage='';
  constructor(private listConstantService: ListConstantService,private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.getTiposDocumento();
    this.formNoMatriculado = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cuit: new FormControl('',  [Validators.required, Validators.minLength(11), CuitValidator.cuit]),
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('',[Validators.required, Validators.minLength(7), Validators.maxLength(8)]),
      usuario: new FormControl('',  [Validators.required, Validators.minLength(6),Validators.maxLength(30), Validators.pattern('[a-z0-9.]*')]),
      mail: new FormControl('',  [Validators.required, Validators.email,Validators.maxLength(100)]),
      password1: new FormControl('',  [Validators.required, Validators.minLength(8),Validators.maxLength(50),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,50}$')]),
      password2: new FormControl('',  [Validators.required]),
      terminos: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required]),
    }, {validator: [PasswordMustMatchValidator.mustmatch('password1', 'password2'), ValueMustMatchValidator.mustmatch(this.emailPreregistro,'mail') ]});
  }

  getTiposDocumento() {
    this.listConstantService.getDocTipos().subscribe((data) => {
      if (data) {
        if (data.success) {
          this.tiposDocumento = data.docTypes;
        }
      }
   });
  }

  onSubmit() {
    this.loading = true;
    if (this.formNoMatriculado.invalid) {
      this.formNoMatriculado.markAllAsTouched();
      this.loading = false;
      return;
    } else {
      const registerNoMatriculado = new RegisterNoMatriculado;
      registerNoMatriculado.nombre = this.formNoMatriculado.get('nombre').value;
      registerNoMatriculado.apellido = this.formNoMatriculado.get('apellido').value;
      registerNoMatriculado.cuit = this.formNoMatriculado.get('cuit').value;
      registerNoMatriculado.tipoDocumento = this.formNoMatriculado.get('tipoDocumento').value;
      registerNoMatriculado.numeroDocumento = this.formNoMatriculado.get('numeroDocumento').value;
      registerNoMatriculado.usuario = this.formNoMatriculado.get('usuario').value;
      registerNoMatriculado.mail = this.formNoMatriculado.get('mail').value;
      registerNoMatriculado.password = this.formNoMatriculado.get('password1').value;
      this.authenticationService.registernomatriculado(registerNoMatriculado).subscribe(result => {
        if(result.success) {
          this.router.navigate(["/registroexitoso"]);
        }
        else {
          this.modalErrorMessage = result.message;
          $("#datosIncorrectos").modal('show');
        }
      })
      this.loading = false;

    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
  }

}
