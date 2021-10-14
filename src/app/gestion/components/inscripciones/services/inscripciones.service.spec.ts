import { TestBed } from "@angular/core/testing";
import { InscripcionesService } from "./inscripciones.service";

describe('InscripcionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InscripcionesService = TestBed.get(InscripcionesService);
    expect(service).toBeTruthy();
  });
});
