import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceReportsLastFiveWeeksComponent } from './entrance-reports-last-five-weeks.component';

describe('EntranceReportsLastFiveWeeksComponent', () => {
  let component: EntranceReportsLastFiveWeeksComponent;
  let fixture: ComponentFixture<EntranceReportsLastFiveWeeksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceReportsLastFiveWeeksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceReportsLastFiveWeeksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
