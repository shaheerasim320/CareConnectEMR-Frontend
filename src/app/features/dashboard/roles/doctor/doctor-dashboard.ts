import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { StatCard as DashboardStatCard } from '../../models/stat-card';
import { StatCardUI } from '../../../../shared/models/stat-card-ui';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TodaysSchedule } from './components/todays-schedule/todays-schedule';
import { NextAppointment } from './components/next-appointment/next-appointment';
import { StatCardSkeleton } from '../../../../shared/components/stat-card/stat-card-skeleton';
import { TodaysScheduleSkeleton } from './components/todays-schedule/todays-schedule-skeleton';
import { NextAppointmentSkeleton } from './components/next-appointment/next-appointment-skeleton';
import { DoctorDashboardService } from './doctor-dashboard.service';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [StatCard, StatCardSkeleton, CommonModule, MatIconModule, TodaysSchedule, TodaysScheduleSkeleton, NextAppointment, NextAppointmentSkeleton],
  providers: [DoctorDashboardService],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.scss',
})
export class DoctorDashboard implements OnInit {
  readonly dashboardService = inject(DoctorDashboardService);

  ngOnInit() {
    this.dashboardService.load().subscribe();
  }

  private toStatCard(metric: DashboardStatCard, label: string, theme: string, icon: string): StatCardUI {
    return {
      label,
      theme,
      icon,
      count: metric.count,
      trendValue: metric.trendValue ?? null,
      trendType: metric.trendType ?? null,
      trendDirection: metric.trendDirection ?? null,
      trendComparison: metric.trendComparison
    };
  }

  statsArray = computed<StatCardUI[]>(() => {
    const data = this.dashboardService.data();
    if (!data) return [];

    return [
      this.toStatCard(data.myAppointmentsToday, 'My Appointments Today', '#f4f6f8', 'today'),
      this.toStatCard(data.myCompletedToday, 'My Completed Today', '#f5f9ff', 'task_alt'),
      this.toStatCard(data.totalPatientsSeen, 'Total Patients Seen', '#eef8ff', 'group')
    ];
  });
}
