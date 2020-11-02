import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { Component, OnInit, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-preregister',
  templateUrl: './preregister.component.html',
  styleUrls: ['./preregister.component.css'],
})
export class PreregisterComponent implements OnInit {
  formregister: FormGroup;
  loading = false;
  modalErrorMessage: string;
  success = false;
  constructor(private formBuilder: FormBuilder, private el: ElementRef, private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.formregister = this.formBuilder.group({
      txtEmail: new FormControl(
        '',
        [Validators.required,
        Validators.email,
        Validators.maxLength(100)]),
      captcha: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.formregister.invalid) {
      this.formregister.markAllAsTouched();
      this.loading = false;
      return;
    } else {
      this.authenticationService.preregister(this.formregister.get('txtEmail').value).subscribe(result => {
        if(result.success) {
          this.router.navigate(["./preregistracionexitosa"]);
        } else {
          this.modalErrorMessage = result.message;
          $("#datosIncorrectos").modal('show');
        }
        this.loading = false;
      });
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
  }
}
