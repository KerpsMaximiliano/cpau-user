import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCpauMailComponent } from './pagocpaumail.component';

describe('PagoCpauMailComponent', () => {
  let component: PagoCpauMailComponent;
  let fixture: ComponentFixture<PagoCpauMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoCpauMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCpauMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
