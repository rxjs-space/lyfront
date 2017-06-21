import { TestBed, inject } from '@angular/core/testing';

import { DialogDataService } from './dialog-data.service';

describe('DialogDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogDataService]
    });
  });

  it('should ...', inject([DialogDataService], (service: DialogDataService) => {
    expect(service).toBeTruthy();
  }));
});
