import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMarkComponent } from './dialog-mark.component';

describe('DialogMarkComponent', () => {
  let component: DialogMarkComponent;
  let fixture: ComponentFixture<DialogMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
