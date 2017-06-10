import { TestBed, inject } from '@angular/core/testing';

import { FormUtilsService } from './form-utils.service';

describe('FormUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormUtilsService]
    });
  });

  it('should ...', inject([FormUtilsService], (service: FormUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
