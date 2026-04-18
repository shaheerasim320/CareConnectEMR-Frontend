import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCardSkeleton } from './stat-card-skeleton';

describe('StatCardSkeleton', () => {
  let component: StatCardSkeleton;
  let fixture: ComponentFixture<StatCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatCardSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
