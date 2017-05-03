import { TestBed, inject } from '@angular/core/testing';

import { TypesResolverService } from './types-resolver.service';

describe('TypesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypesResolverService]
    });
  });

  it('should ...', inject([TypesResolverService], (service: TypesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
