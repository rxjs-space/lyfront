import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2HomeComponent } from './survey2-home.component';

describe('Survey2HomeComponent', () => {
  let component: Survey2HomeComponent;
  let fixture: ComponentFixture<Survey2HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
