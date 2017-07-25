import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2ReadyCommercialComponent } from './survey2-ready-commercial.component';

describe('Survey2ReadyCommercialComponent', () => {
  let component: Survey2ReadyCommercialComponent;
  let fixture: ComponentFixture<Survey2ReadyCommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2ReadyCommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2ReadyCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
