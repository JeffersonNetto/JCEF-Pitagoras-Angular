import { TestBed } from '@angular/core/testing';

import { PatrocinadoresService } from './patrocinadores.service';

describe('PatrocinadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatrocinadoresService = TestBed.get(PatrocinadoresService);
    expect(service).toBeTruthy();
  });
});
