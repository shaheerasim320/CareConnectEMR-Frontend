import { Component, computed, effect, inject } from '@angular/core';
import { Dashboard } from '../../services/dashboard';
import { StatCard } from '../../../../shared/component/stat-card/stat-card';
import { StatCardSkeleton } from '../../../../shared/component/stat-card-skeleton/stat-card-skeleton';
import { CommonModule } from '@angular/common';
import { StatCard as DashboardStatCard } from '../../../../core/models/dashboard/stat-card';
import { StatCardUI } from '../../../../shared/models/stat-card-ui';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentBreakdown } from './components/appointment-breakdown/appointment-breakdown';
import { AppointmentBreakdownSkeleton } from './components/appointment-breakdown-skeleton/appointment-breakdown-skeleton';
import { TopDoctors } from './components/top-doctors/top-doctors';
import { TopDoctorsSkeleton } from './components/top-doctors-skeleton/top-doctors-skeleton';
import { RecentRegistrations } from './components/recent-registrations/recent-registrations';
import { RecentRegistrationsSkeleton } from './components/recent-registrations-skeleton/recent-registrations-skeleton';

@Component({
  selector: 'app-admin-dashboard',
  imports: [StatCard, StatCardSkeleton, CommonModule, MatIconModule, AppointmentBreakdown, AppointmentBreakdownSkeleton, TopDoctors, TopDoctorsSkeleton, RecentRegistrations, RecentRegistrationsSkeleton],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  dashboardService = inject(Dashboard);

  private toStatCard(metric: DashboardStatCard, label: string, theme: string, icon: string):StatCardUI {
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
    const data = this.dashboardService.adminData();
    if (!data) return [];

    return [
      this.toStatCard(data.totalPatients, 'Total Patients', '#eef8ff', 'group'),
      this.toStatCard(data.appointmentsToday, 'Appointments Today', '#f4f6f8', 'today'),
      this.toStatCard(data.completedToday, 'Completed Today', '#f5f9ff', 'task_alt'),
      this.toStatCard(data.cancellationRate, 'Cancellation Rate', '#f9f5f5', 'event_busy')
    ];
  });

  breakdown = computed(() => this.dashboardService.adminData()?.breakdownToday);

  constructor() {
    effect(() => {
      this.dashboardService.getAdminDashboard().subscribe();
    });
  }

}
