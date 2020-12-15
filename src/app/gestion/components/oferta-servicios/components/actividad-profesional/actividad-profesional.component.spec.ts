import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadProfesionalComponent } from './actividad-profesional.component';

describe('ActividadProfesionalComponent', () => {
  let component: ActividadProfesionalComponent;
  let fixture: ComponentFixture<ActividadProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadProfesionalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
