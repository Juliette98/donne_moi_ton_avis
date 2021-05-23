import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesPublicationsComponent } from './mes-publications.component';

describe('MesPublicationsComponent', () => {
  let component: MesPublicationsComponent;
  let fixture: ComponentFixture<MesPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
