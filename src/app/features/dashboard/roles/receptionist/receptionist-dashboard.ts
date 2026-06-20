import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { StatCard as DashboardStatCard } from '../../models/stat-card';
import { StatCardUI } from '../../../../shared/models/stat-card-ui';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';
import { TodaysQueue } from "./components/todays-queue/todays-queue";
import { StatCardSkeleton } from '../../../../shared/components/stat-card/stat-card-skeleton';
import { TodaysQueueSkeleton } from './components/todays-queue/todays-queue-skeleton';
import { ReceptionistDashboardService } from './receptionist-dashboard.service';

@Component({
  selector: 'app-receptionist-dashboard',
  imports: [StatCard, StatCardSkeleton, TodaysQueue, TodaysQueueSkeleton],
  providers: [ReceptionistDashboardService],
  templateUrl: './receptionist-dashboard.html',
  styleUrl: './receptionist-dashboard.scss',
})
export class ReceptionistDashboard implements OnInit {
  readonly dashboardService = inject(ReceptionistDashboardService);

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
      this.toStatCard(data.appointmentsToday, 'Appointments Today', '#f4f6f8', 'today'),
      this.toStatCard(data.checkedInNow, 'Checked In Now', '#f5f9ff', 'task_alt'),
      this.toStatCard(data.newPatientsToday, 'New Patients Today', '#eef8ff', 'group')
    ];
  });
}
