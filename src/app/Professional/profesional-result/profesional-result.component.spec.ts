import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalResultComponent } from './profesional-result.component';

describe('ProfesionalResultComponent', () => {
  let component: ProfesionalResultComponent;
  let fixture: ComponentFixture<ProfesionalResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
