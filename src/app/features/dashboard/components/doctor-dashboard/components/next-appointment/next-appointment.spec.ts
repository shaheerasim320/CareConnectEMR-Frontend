import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBreakdown } from './appointment-breakdown';

describe('AppointmentBreakdown', () => {
  let component: AppointmentBreakdown;
  let fixture: ComponentFixture<AppointmentBreakdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentBreakdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentBreakdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
