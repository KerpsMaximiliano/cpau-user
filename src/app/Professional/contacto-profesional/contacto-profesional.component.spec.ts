import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoProfesionalComponent } from './contacto-profesional.component';

describe('ContactoProfesionalComponent', () => {
  let component: ContactoProfesionalComponent;
  let fixture: ComponentFixture<ContactoProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactoProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
