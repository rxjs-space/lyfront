import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2ReadyNcnmComponent } from './survey2-ready-ncnm.component';

describe('Survey2ReadyNcnmComponent', () => {
  let component: Survey2ReadyNcnmComponent;
  let fixture: ComponentFixture<Survey2ReadyNcnmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2ReadyNcnmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2ReadyNcnmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
