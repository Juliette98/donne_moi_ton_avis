import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationProfileComponent } from './modification-profile.component';

describe('ModificationProfileComponent', () => {
  let component: ModificationProfileComponent;
  let fixture: ComponentFixture<ModificationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
