import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDoctors } from './top-doctors';

describe('TopDoctors', () => {
  let component: TopDoctors;
  let fixture: ComponentFixture<TopDoctors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDoctors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopDoctors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
