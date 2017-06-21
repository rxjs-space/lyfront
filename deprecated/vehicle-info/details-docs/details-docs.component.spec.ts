import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDocsComponent } from './details-docs.component';

describe('DetailsDocsComponent', () => {
  let component: DetailsDocsComponent;
  let fixture: ComponentFixture<DetailsDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
