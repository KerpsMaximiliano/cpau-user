import { TestBed } from '@angular/core/testing';

import { PosgradoService } from './posgrado.service';

describe('PosgradoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosgradoService = TestBed.get(PosgradoService);
    expect(service).toBeTruthy();
  });
});
