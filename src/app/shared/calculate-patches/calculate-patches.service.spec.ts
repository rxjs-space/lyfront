import { TestBed, inject } from '@angular/core/testing';

import { CalculatePatchesService } from './calculate-patches.service';

describe('CalculatePatchesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatePatchesService]
    });
  });

  it('should ...', inject([CalculatePatchesService], (service: CalculatePatchesService) => {
    expect(service).toBeTruthy();
  }));
});
