import { TestBed, inject } from '@angular/core/testing';

import { AsyncDataLoaderService } from './async-data-loader.service';

describe('AsyncDataLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsyncDataLoaderService]
    });
  });

  it('should ...', inject([AsyncDataLoaderService], (service: AsyncDataLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
