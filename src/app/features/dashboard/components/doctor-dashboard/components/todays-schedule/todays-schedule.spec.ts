import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysSchedule } from './todays-schedule';

describe('TodaysSchedule', () => {
  let component: TodaysSchedule;
  let fixture: ComponentFixture<TodaysSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysSchedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
