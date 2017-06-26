import { TestBed, inject } from '@angular/core/testing';

import { FormErrorsService } from './form-errors.service';

describe('FormErrorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormErrorsService]
    });
  });

  it('should ...', inject([FormErrorsService], (service: FormErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
