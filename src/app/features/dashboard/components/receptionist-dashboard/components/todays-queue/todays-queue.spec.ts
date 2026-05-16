import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodaysQueue } from './todays-queue';


describe('TodaysSchedule', () => {
  let component: TodaysQueue;
  let fixture: ComponentFixture<TodaysQueue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysQueue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysQueue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
