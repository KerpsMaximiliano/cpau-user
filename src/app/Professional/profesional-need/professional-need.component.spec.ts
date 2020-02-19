import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalNeedComponent } from './professional-need.component';

describe('ProfessionalNeedComponent', () => {
  let component: ProfessionalNeedComponent;
  let fixture: ComponentFixture<ProfessionalNeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalNeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
