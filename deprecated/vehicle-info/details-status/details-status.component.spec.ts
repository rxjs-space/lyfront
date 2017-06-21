import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStatusComponent } from './details-status.component';

describe('DetailsStatusComponent', () => {
  let component: DetailsStatusComponent;
  let fixture: ComponentFixture<DetailsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
