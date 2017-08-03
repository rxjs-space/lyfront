import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInputFromDismantlingInputReadyComponent } from './inventory-input-from-dismantling-input-ready.component';

describe('InventoryInputFromDismantlingInputReadyComponent', () => {
  let component: InventoryInputFromDismantlingInputReadyComponent;
  let fixture: ComponentFixture<InventoryInputFromDismantlingInputReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryInputFromDismantlingInputReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryInputFromDismantlingInputReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
