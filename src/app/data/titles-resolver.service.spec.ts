import { TestBed, inject } from '@angular/core/testing';

import { TitlesResolverService } from './titles-resolver.service';

describe('TitlesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitlesResolverService]
    });
  });

  it('should ...', inject([TitlesResolverService], (service: TitlesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
