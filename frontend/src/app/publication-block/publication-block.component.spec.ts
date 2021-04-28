import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationBlockComponent } from './publication-block.component';

describe('PublicationBlockComponent', () => {
  let component: PublicationBlockComponent;
  let fixture: ComponentFixture<PublicationBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
