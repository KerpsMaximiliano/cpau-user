import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicityRegisterComponent } from './publicity-register.component';

describe('PublicityRegisterComponent', () => {
  let component: PublicityRegisterComponent;
  let fixture: ComponentFixture<PublicityRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicityRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicityRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
