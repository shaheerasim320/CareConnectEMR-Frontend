import { Component, computed, effect, inject } from '@angular/core';
import { Dashboard } from '../../services/dashboard';
import { StatCard as DashboardStatCard } from '../../../../core/models/dashboard/stat-card';
import { StatCardUI } from '../../../../shared/models/stat-card-ui';
import { StatCard } from '../../../../shared/component/stat-card/stat-card';
import { StatCardSkeleton } from '../../../../shared/component/stat-card-skeleton/stat-card-skeleton';
import { TodaysQueue } from "./components/todays-queue/todays-queue";
import { TodaysQueueSkeleton } from "./components/todays-queue-skeleton/todays-queue-skeleton";

@Component({
  selector: 'app-receptionist-dashboard',
  imports: [StatCard, StatCardSkeleton, TodaysQueue, TodaysQueueSkeleton],
  templateUrl: './receptionist-dashboard.html',
  styleUrl: './receptionist-dashboard.scss',
})
export class ReceptionistDashboard {
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
    const data = this.dashboardService.receptionistData();
    if (!data) return [];

    return [
      this.toStatCard(data.appointmentsToday, 'Appointments Today', '#f4f6f8', 'today'),
      this.toStatCard(data.checkedInNow, 'Checked In Now', '#f5f9ff', 'task_alt'),
      this.toStatCard(data.newPatientsToday, 'New Patients Today', '#eef8ff', 'group')
    ];
  });


  constructor() {
    effect(() => {
      this.dashboardService.getReceptionistDashboard().subscribe();
    });
  }
}
