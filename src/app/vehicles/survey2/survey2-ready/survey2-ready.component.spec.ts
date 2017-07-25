import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2ReadyComponent } from './survey2-ready.component';

describe('Survey2ReadyComponent', () => {
  let component: Survey2ReadyComponent;
  let fixture: ComponentFixture<Survey2ReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2ReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2ReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
