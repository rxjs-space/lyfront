import { TestBed, inject } from '@angular/core/testing';

import { SharedValidatorsService } from './shared-validators.service';

describe('SharedValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedValidatorsService]
    });
  });

  it('should ...', inject([SharedValidatorsService], (service: SharedValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
