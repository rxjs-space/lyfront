import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInputFromDismantlingComponent } from './inventory-input-from-dismantling.component';

describe('InventoryInputFromDismantlingComponent', () => {
  let component: InventoryInputFromDismantlingComponent;
  let fixture: ComponentFixture<InventoryInputFromDismantlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryInputFromDismantlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryInputFromDismantlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
