import { TestBed } from '@angular/core/testing';

import { TelefonoService } from './telefono.service';

describe('TelefonoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelefonoService = TestBed.get(TelefonoService);
    expect(service).toBeTruthy();
  });
});
