import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoAnuncianteComponent } from './contacto-anunciante.component';

describe('ContactoAnuncianteComponent', () => {
  let component: ContactoAnuncianteComponent;
  let fixture: ComponentFixture<ContactoAnuncianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactoAnuncianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoAnuncianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
