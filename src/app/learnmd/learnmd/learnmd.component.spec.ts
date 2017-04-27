import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnmdComponent } from './learnmd.component';

describe('LearnmdComponent', () => {
  let component: LearnmdComponent;
  let fixture: ComponentFixture<LearnmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
