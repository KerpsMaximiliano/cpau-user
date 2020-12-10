import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosgradosComponent } from './posgrados.component';

describe('PosgradosComponent', () => {
  let component: PosgradosComponent;
  let fixture: ComponentFixture<PosgradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosgradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosgradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
