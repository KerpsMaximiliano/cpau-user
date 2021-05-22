import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarBoletaComponent } from './pagar-boleta.component';

describe('PagarBoletaComponent', () => {
  let component: PagarBoletaComponent;
  let fixture: ComponentFixture<PagarBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
