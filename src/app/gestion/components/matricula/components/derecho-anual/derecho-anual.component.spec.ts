import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DerechoAnualComponent } from './derecho-anual.component';

describe('DerechoAnualComponent', () => {
  let component: DerechoAnualComponent;
  let fixture: ComponentFixture<DerechoAnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DerechoAnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DerechoAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
