import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMatriculadoComponent } from './register-matriculado.component';

describe('RegisterMatriculadoComponent', () => {
  let component: RegisterMatriculadoComponent;
  let fixture: ComponentFixture<RegisterMatriculadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMatriculadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMatriculadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
