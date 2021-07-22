import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fileSizeValidator } from '@app/shared/validators/fileSizeValidator';
import { requiredFileType } from '@app/shared/validators/requireFileTypeValidator';
import { ToastrService } from 'ngx-toastr';
import { CurriculumVitaeService } from './service/curriculum-vitae.service';

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent implements OnInit {

  get f() { return this.curriculumForm.controls; }
  collapsed: boolean;
  archivo: boolean;

  public curriculumForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
             private curriculumVitaeService: CurriculumVitaeService,
             private toastr: ToastrService,
             private cd: ChangeDetectorRef) {
    this.curriculumForm = this.formBuilder.group({
      id: [],
      archivo: [null, Validators.required],
      file: []
    });
  }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.curriculumVitaeService.getAll().subscribe(x => {
      this.archivo = x;
    });
  }
  protected reload() {
    this.initData();
  }

  subirArchivo() {
    if (this.curriculumForm.valid) {
      this.curriculumVitaeService.insert(this.curriculumForm.controls.file.value)
      .subscribe(x => {
        if (x.success) {
          this.archivo = true;
          this.toastr.success(null, 'Curriculum subido correctamente.');
          this.curriculumForm.reset();
        }
      });
    } else {
      this.curriculumForm.markAllAsTouched();
      this.toastr.error(null, 'Por favor complete los datos requeridos.');
    }
  }

  descargarArchivo() {
    this.curriculumVitaeService.getDownloadFile();
  }

  onFileChange(event) {
    let reader = new FileReader();

    this.curriculumForm.controls.archivo.setValidators([fileSizeValidator(event.target.files),
                                                      Validators.required,
                                                      requiredFileType(["pdf"])]);
    
    this.curriculumForm.controls.archivo.updateValueAndValidity();

    if(event.target.files && event.target.files.length && this.curriculumForm.controls.archivo.valid) {

      const [file] = event.target.files;
      reader.readAsArrayBuffer(file);
    
      reader.onloadend = () => {
        const arrayBuffer: any = reader.result,
        array = new Uint8Array(arrayBuffer);
        const fileByteArray = [];
        for (let i = 0; i < array.length; i++) {
            fileByteArray.push(array[i]);
        }
        this.curriculumForm.controls.file.patchValue(fileByteArray);
      };
    }
  }
}
