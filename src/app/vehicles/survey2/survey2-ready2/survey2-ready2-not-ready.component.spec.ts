import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2Ready2NotReadyComponent } from './survey2-ready2-not-ready.component';

describe('Survey2Ready2NotReadyComponent', () => {
  let component: Survey2Ready2NotReadyComponent;
  let fixture: ComponentFixture<Survey2Ready2NotReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2Ready2NotReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2Ready2NotReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
