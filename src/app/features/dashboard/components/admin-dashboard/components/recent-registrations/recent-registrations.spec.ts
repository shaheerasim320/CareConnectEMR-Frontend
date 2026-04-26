import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentRegistrations } from './recent-registrations';

describe('RecentRegistrations', () => {
  let component: RecentRegistrations;
  let fixture: ComponentFixture<RecentRegistrations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentRegistrations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentRegistrations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
