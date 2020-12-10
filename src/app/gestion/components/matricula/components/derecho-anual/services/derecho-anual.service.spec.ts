import { TestBed } from '@angular/core/testing';

import { DerechoAnualService } from './derecho-anual.service';

describe('DerechoAnualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DerechoAnualService = TestBed.get(DerechoAnualService);
    expect(service).toBeTruthy();
  });
});
