import { Component, computed, effect, inject } from '@angular/core';
import { Dashboard } from '../../services/dashboard';
import { StatCard as DashboardStatCard } from '../../../../core/models/dashboard/stat-card';
import { StatCardUI } from '../../../../shared/models/stat-card-ui';
import { StatCard } from '../../../../shared/component/stat-card/stat-card';
import { StatCardSkeleton } from '../../../../shared/component/stat-card-skeleton/stat-card-skeleton';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TodaysSchedule } from './components/todays-schedule/todays-schedule';
import { TodaysScheduleSkeleton } from './components/todays-schedule-skeleton/top-doctors-skeleton';
import { NextAppointment } from './components/next-appointment/next-appointment';
import { NextAppointmentSkeleton } from './components/next-appointment-skeleton/next-appointment-skeleton';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [StatCard, StatCardSkeleton, CommonModule, MatIconModule, TodaysSchedule, TodaysScheduleSkeleton, NextAppointment, NextAppointmentSkeleton],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.scss',
})
export class DoctorDashboard {
  dashboardService = inject(Dashboard);

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
    const data = this.dashboardService.doctorData();
    if (!data) return [];

    return [
      this.toStatCard(data.myAppointmentsToday, 'My Appointments Today', '#f4f6f8', 'today'),
      this.toStatCard(data.myCompletedToday, 'My Completed Today', '#f5f9ff', 'task_alt'),
      this.toStatCard(data.totalPatientsSeen, 'Total Patients Seen', '#eef8ff', 'group')
    ];
  });


  constructor() {
    effect(() => {
      this.dashboardService.getDoctorDashboard().subscribe();
    });
  }
}
