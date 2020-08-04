import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNomatriculadoComponent } from './register-nomatriculado.component';

describe('RegisterNomatriculadoComponent', () => {
  let component: RegisterNomatriculadoComponent;
  let fixture: ComponentFixture<RegisterNomatriculadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNomatriculadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNomatriculadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
