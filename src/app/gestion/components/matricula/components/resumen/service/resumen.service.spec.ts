import { TestBed } from '@angular/core/testing';

import { ResumenService } from './resumen.service';

describe('ResumenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResumenService = TestBed.get(ResumenService);
    expect(service).toBeTruthy();
  });
});
