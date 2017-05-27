import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGeneralComponent } from './details-general.component';

describe('DetailsGeneralComponent', () => {
  let component: DetailsGeneralComponent;
  let fixture: ComponentFixture<DetailsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
