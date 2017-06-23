import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceReportsComponent } from './entrance-reports.component';

describe('EntranceReportsComponent', () => {
  let component: EntranceReportsComponent;
  let fixture: ComponentFixture<EntranceReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
