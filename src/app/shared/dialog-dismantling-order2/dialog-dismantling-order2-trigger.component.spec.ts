import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDismantlingOrder2TriggerComponent } from './dialog-dismantling-order2-trigger.component';

describe('DialogDismantlingOrder2TriggerComponent', () => {
  let component: DialogDismantlingOrder2TriggerComponent;
  let fixture: ComponentFixture<DialogDismantlingOrder2TriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDismantlingOrder2TriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDismantlingOrder2TriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
