import { TestBed, inject } from '@angular/core/testing';

import { DismantlingOrdersByVINResolverService } from './dismantling-orders-by-vin-resolver.service';

describe('DismantlingOrdersByIdResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DismantlingOrdersByVINResolverService]
    });
  });

  it('should ...', inject([DismantlingOrdersByVINResolverService], (service: DismantlingOrdersByVINResolverService) => {
    expect(service).toBeTruthy();
  }));
});
