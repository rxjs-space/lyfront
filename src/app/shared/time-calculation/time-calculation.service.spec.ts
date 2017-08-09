import { TestBed, inject } from '@angular/core/testing';

import { TimeCalculationService } from './time-calculation.service';

describe('TimeCalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeCalculationService]
    });
  });

  it('should ...', inject([TimeCalculationService], (service: TimeCalculationService) => {
    expect(service).toBeTruthy();
  }));
});
