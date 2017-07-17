import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MofcomCaptchComponent } from './mofcom-captch.component';

describe('MofcomCaptchComponent', () => {
  let component: MofcomCaptchComponent;
  let fixture: ComponentFixture<MofcomCaptchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MofcomCaptchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MofcomCaptchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
