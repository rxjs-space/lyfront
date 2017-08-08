import { TestBed, inject } from '@angular/core/testing';

import { EventListenersService } from './event-listeners.service';

describe('EventListenersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventListenersService]
    });
  });

  it('should ...', inject([EventListenersService], (service: EventListenersService) => {
    expect(service).toBeTruthy();
  }));
});
