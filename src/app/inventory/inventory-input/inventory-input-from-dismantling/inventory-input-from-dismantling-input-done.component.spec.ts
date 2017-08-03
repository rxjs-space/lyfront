import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInputFromDismantlingInputDoneComponent } from './inventory-input-from-dismantling-input-done.component';

describe('InventoryInputFromDismantlingInputDoneComponent', () => {
  let component: InventoryInputFromDismantlingInputDoneComponent;
  let fixture: ComponentFixture<InventoryInputFromDismantlingInputDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryInputFromDismantlingInputDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryInputFromDismantlingInputDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
