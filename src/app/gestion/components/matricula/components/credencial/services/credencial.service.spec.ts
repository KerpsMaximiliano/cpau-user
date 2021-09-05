import { TestBed } from '@angular/core/testing';

import { CredencialService } from './credencial.service';

describe('CredencialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CredencialService = TestBed.get(CredencialService);
    expect(service).toBeTruthy();
  });
});
