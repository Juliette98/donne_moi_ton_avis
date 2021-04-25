import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPublicationComponent } from './creation-publication.component';

describe('CreationPublicationComponent', () => {
  let component: CreationPublicationComponent;
  let fixture: ComponentFixture<CreationPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationPublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
