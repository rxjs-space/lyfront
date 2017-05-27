import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogYesOrNoComponent } from './dialog-yes-or-no.component';

describe('DialogYesOrNoComponent', () => {
  let component: DialogYesOrNoComponent;
  let fixture: ComponentFixture<DialogYesOrNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogYesOrNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogYesOrNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
