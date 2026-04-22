import { Component, computed, inject, OnInit } from '@angular/core';
import { Dashboard } from '../../services/dashboard';
import { StatCard } from '../../../../shared/component/stat-card/stat-card';
import { StatCardSkeleton } from '../../../../shared/component/stat-card-skeleton/stat-card-skeleton';
import { CommonModule } from '@angular/common';
import { DashboardMetric } from '../../../../core/models/dashboard';

@Component({
  selector: 'app-admin-dashboard',
  imports: [StatCard, StatCardSkeleton, CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {
  dashboardService = inject(Dashboard);

  private toStatCard(metric: DashboardMetric, label: string, theme: string, icon: string) {
    return {
      label,
      value: metric.count,
      trend: Math.abs(metric.trendPercent ?? 0),
      trendDirection: metric.trendDirection,
      theme,
      icon
    };
  }

  statsArray = computed(() => {
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

  ngOnInit() {
    this.dashboardService.getAdminDashboard().subscribe();
  }

}
