import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';
import { CommonModule } from '@angular/common';
import { StatCard as DashboardStatCard } from '../../models/stat-card';
import { StatCardUI } from '../../../../shared/models/stat-card-ui';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentBreakdown } from './components/appointment-breakdown/appointment-breakdown';
import { TopDoctors } from './components/top-doctors/top-doctors';
import { RecentRegistrations } from './components/recent-registrations/recent-registrations';
import { StatCardSkeleton } from '../../../../shared/components/stat-card/stat-card-skeleton';
import { AppointmentBreakdownSkeleton } from './components/appointment-breakdown/appointment-breakdown-skeleton';
import { TopDoctorsSkeleton } from './components/top-doctors/top-doctors-skeleton';
import { RecentRegistrationsSkeleton } from './components/recent-registrations/recent-registrations-skeleton';
import { AdminDashboardService } from './admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [StatCard, StatCardSkeleton, CommonModule, MatIconModule, AppointmentBreakdown, AppointmentBreakdownSkeleton, TopDoctors, TopDoctorsSkeleton, RecentRegistrations, RecentRegistrationsSkeleton],
  providers: [AdminDashboardService],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {
  readonly dashboardService = inject(AdminDashboardService);

  ngOnInit() {
    this.dashboardService.load().subscribe();
  }

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
    const data = this.dashboardService.data();
    if (!data) return [];

    return [
      this.toStatCard(data.totalPatients, 'Total Patients', '#eef8ff', 'group'),
      this.toStatCard(data.appointmentsToday, 'Appointments Today', '#f4f6f8', 'today'),
      this.toStatCard(data.completedToday, 'Completed Today', '#f5f9ff', 'task_alt'),
      this.toStatCard(data.cancellationRate, 'Cancellation Rate', '#f9f5f5', 'event_busy')
    ];
  });

  breakdown = computed(() => this.dashboardService.data()?.breakdownToday);
}
