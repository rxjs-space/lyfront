import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMetadataComponent } from './details-metadata.component';

describe('DetailsMetadataComponent', () => {
  let component: DetailsMetadataComponent;
  let fixture: ComponentFixture<DetailsMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
