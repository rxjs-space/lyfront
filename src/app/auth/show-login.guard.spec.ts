import { TestBed, async, inject } from '@angular/core/testing';

import { ShowLoginGuard } from './show-login.guard';

describe('ShowLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowLoginGuard]
    });
  });

  it('should ...', inject([ShowLoginGuard], (guard: ShowLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
