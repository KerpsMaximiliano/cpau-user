import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fileSizeValidator } from '@app/shared/validators/fileSizeValidator';
import { requiredFileType } from '@app/shared/validators/requireFileTypeValidator';
import { CurriculumVitaeService } from './service/curriculum-vitae.service';

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent implements OnInit {

  get f() { return this.curriculumForm.controls; }
  collapsed: boolean;

  public curriculumForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
             private curriculumVitaeService: CurriculumVitaeService,
             private cd: ChangeDetectorRef) {
    this.curriculumForm = this.formBuilder.group({
      id: [],
      archivo: [],
    });
  }

  ngOnInit() {
  }

  subirArchivo() {
    if (this.curriculumForm.valid) {
      this.curriculumVitaeService.insert(this.curriculumForm.controls.archivo.value)
      .subscribe(x => {
        // TODO
        this.curriculumForm.reset();
      });
    }
  }

  descargarArchivo() {
    //
  }

  onFileChange(event) {
    let reader = new FileReader();

    this.curriculumForm.controls.archivo.setValidators([fileSizeValidator(event.target.files),
                                                      Validators.required,
                                                      requiredFileType(["pdf"])]);
    
    this.curriculumForm.controls.archivo.updateValueAndValidity();              

    if(event.target.files && event.target.files.length && this.curriculumForm.controls.archivo.valid) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.curriculumForm.patchValue({
          archivo: reader.result
        });
        
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
