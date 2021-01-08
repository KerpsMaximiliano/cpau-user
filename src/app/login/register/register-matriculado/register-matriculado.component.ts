import { ValueMustMatchValidator } from '@app/_validators/valueMustMatch.validator';
import { RegisterMatriculado } from '@app/_models/register-matriculado.model';
import { PasswordMustMatchValidator } from '@app/_validators/passwordMustMatch.validator';
import { CuitValidator } from '@app/_validators/cuit.validator';
import { DateValidator } from '@app/_validators/date.validator';
import { Component, OnInit, Input } from '@angular/core';
import { ListConstantService } from '@app/_services/listconstant.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-register-matriculado',
  templateUrl: './register-matriculado.component.html',
  styleUrls: ['./register-matriculado.component.css']
})
export class RegisterMatriculadoComponent implements OnInit {
  @Input() emailPreregistro: string;
  formMatriculado: FormGroup;
  tiposMatricula = [];
  tiposDocumento = [];
  loading= false;
  modalErrorMessage = '';
  constructor(private listConstantService: ListConstantService,private formBuilder: FormBuilder,private authenticationService:AuthenticationService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.getTiposMatricula();
    this.getTiposDocumento();
    this.formMatriculado = this.formBuilder.group({
      tipoMatricula: new FormControl('', [Validators.required]),
      numeroMatricula: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('',[Validators.required, Validators.minLength(7), Validators.maxLength(8)]),
      fechaNacimiento: new FormControl('', [Validators.required, DateValidator.date]),
      cuit: new FormControl('',  [Validators.required, Validators.minLength(11), CuitValidator.cuit]),
      usuario: new FormControl('',  [Validators.required, Validators.minLength(6),Validators.maxLength(30), Validators.pattern('[a-z0-9.]*')]),
      mail: new FormControl('',  [Validators.required, Validators.email,Validators.maxLength(100)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,50}$')]),
      password2: new FormControl('', [Validators.required]),
      terminos: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required]),
    }, {validator: [PasswordMustMatchValidator.mustmatch('password1', 'password2'), ValueMustMatchValidator.mustmatch(this.emailPreregistro,'mail') ]});
  }

  getTiposMatricula() {
    this.listConstantService.getMatriculaTipos().subscribe((data) => {
    if (data) {
      if (data.success) {
        this.tiposMatricula = data.matriculastipos;
      }
    }
  })
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
    if (this.formMatriculado.invalid) {
      this.formMatriculado.markAllAsTouched();
      this.loading = false;
      return;
    } else {
      const registerMatriculado = new RegisterMatriculado;
      registerMatriculado.tipoMatricula = this.formMatriculado.get('tipoMatricula').value;
      registerMatriculado.numeroMatricula = this.formMatriculado.get('numeroMatricula').value;
      registerMatriculado.tipoDocumento = this.formMatriculado.get('tipoDocumento').value;
      registerMatriculado.numeroDocumento = this.formMatriculado.get('numeroDocumento').value;
      registerMatriculado.fechaNacimiento = new Date(this.formMatriculado.get('fechaNacimiento').value).toISOString()
      registerMatriculado.cuit = this.formMatriculado.get('cuit').value;
      registerMatriculado.usuario = this.formMatriculado.get('usuario').value;
      registerMatriculado.mail = this.formMatriculado.get('mail').value;
      registerMatriculado.password = this.formMatriculado.get('password1').value;
      console.log(registerMatriculado);
      this.authenticationService.registermatriculado(registerMatriculado).subscribe(result => {
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
