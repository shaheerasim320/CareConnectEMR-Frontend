import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentRegistrationsSkeleton } from './recent-registrations-skeleton';

describe('RecentRegistrationsSkeleton', () => {
  let component: RecentRegistrationsSkeleton;
  let fixture: ComponentFixture<RecentRegistrationsSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentRegistrationsSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentRegistrationsSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
