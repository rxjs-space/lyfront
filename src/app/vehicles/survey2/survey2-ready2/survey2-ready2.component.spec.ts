import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2Ready2Component } from './survey2-ready2.component';

describe('Survey2Ready2Component', () => {
  let component: Survey2Ready2Component;
  let fixture: ComponentFixture<Survey2Ready2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2Ready2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2Ready2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
