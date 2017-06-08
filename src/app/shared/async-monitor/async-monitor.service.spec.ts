import { TestBed, inject } from '@angular/core/testing';

import { AsyncMonitorService } from './async-monitor.service';

describe('AsyncMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsyncMonitorService]
    });
  });

  it('should ...', inject([AsyncMonitorService], (service: AsyncMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
