import { TestBed } from '@angular/core/testing';

import { ContraseniaService } from './contrasenia.service';

describe('ContraseniaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContraseniaService = TestBed.get(ContraseniaService);
    expect(service).toBeTruthy();
  });
});
