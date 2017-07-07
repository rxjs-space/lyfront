import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOrError3Component } from './loading-or-error-3.component';

describe('LoadingOrError3Component', () => {
  let component: LoadingOrError3Component;
  let fixture: ComponentFixture<LoadingOrError3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingOrError3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOrError3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
