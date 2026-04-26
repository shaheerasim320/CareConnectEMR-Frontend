import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDoctorsSkeleton } from './top-doctors-skeleton';

describe('TopDoctorsSkeleton', () => {
  let component: TopDoctorsSkeleton;
  let fixture: ComponentFixture<TopDoctorsSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDoctorsSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopDoctorsSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
