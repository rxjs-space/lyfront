import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceHomeComponent } from './entrance-home.component';

describe('EntranceHomeComponent', () => {
  let component: EntranceHomeComponent;
  let fixture: ComponentFixture<EntranceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
