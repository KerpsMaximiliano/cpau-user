import { TestBed } from '@angular/core/testing';

import { DomicilioService } from './domicilio.service';

describe('DomicilioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomicilioService = TestBed.get(DomicilioService);
    expect(service).toBeTruthy();
  });
});
