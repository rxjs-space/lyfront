import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConditionRvFdComponent } from './details-condition-rv-fd.component';

describe('DetailsConditionRvFdComponent', () => {
  let component: DetailsConditionRvFdComponent;
  let fixture: ComponentFixture<DetailsConditionRvFdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsConditionRvFdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsConditionRvFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
