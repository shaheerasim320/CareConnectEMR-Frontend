import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodaysScheduleSkeleton } from './top-doctors-skeleton';



describe('TopDoctorsSkeleton', () => {
  let component: TodaysScheduleSkeleton;
  let fixture: ComponentFixture<TodaysScheduleSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysScheduleSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysScheduleSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
