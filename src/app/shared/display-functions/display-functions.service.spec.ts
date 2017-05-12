import { TestBed, inject } from '@angular/core/testing';

import { DisplayFunctionsService } from './display-functions.service';

describe('DisplayFunctionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayFunctionsService]
    });
  });

  it('should ...', inject([DisplayFunctionsService], (service: DisplayFunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
