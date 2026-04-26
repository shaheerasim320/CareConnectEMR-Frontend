import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBreakdownSkeleton } from './appointment-breakdown-skeleton';

describe('AppointmentBreakdownSkeleton', () => {
  let component: AppointmentBreakdownSkeleton;
  let fixture: ComponentFixture<AppointmentBreakdownSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentBreakdownSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentBreakdownSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
