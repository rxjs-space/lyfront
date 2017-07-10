import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTypesComponent } from './other-types.component';

describe('OtherTypesComponent', () => {
  let component: OtherTypesComponent;
  let fixture: ComponentFixture<OtherTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
