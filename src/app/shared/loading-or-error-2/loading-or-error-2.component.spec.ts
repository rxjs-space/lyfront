import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOrError2Component } from './loading-or-error-2.component';

describe('LoadingOrError2Component', () => {
  let component: LoadingOrError2Component;
  let fixture: ComponentFixture<LoadingOrError2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingOrError2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOrError2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
