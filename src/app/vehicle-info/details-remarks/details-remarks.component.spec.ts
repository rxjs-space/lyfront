import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRemarksComponent } from './details-remarks.component';

describe('DetailsRemarksComponent', () => {
  let component: DetailsRemarksComponent;
  let fixture: ComponentFixture<DetailsRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
