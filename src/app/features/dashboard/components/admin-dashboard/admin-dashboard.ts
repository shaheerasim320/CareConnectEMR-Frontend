import { Component, computed, inject, OnInit } from '@angular/core';
import { Dashboard } from '../../services/dashboard';
import { StatCard } from '../../../../shared/component/stat-card/stat-card';
import { StatCardSkeleton } from '../../../../shared/component/stat-card-skeleton/stat-card-skeleton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [StatCard, StatCardSkeleton, CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {
  dashboardService = inject(Dashboard);

  statsArray = computed(() => {
    const data = this.dashboardService.adminData();
    if (!data) return [];

    return [
      { ...data.totalPatients, theme: '#eef8ff', label: 'Total Patients', icon: 'group' },
      { ...data.appointmentsToday, theme: '#f4f6f8', label: 'Appointments Today', icon: 'today' },
      { ...data.completedToday, theme: '#f5f9ff', label: 'Completed Today', icon : 'task_alt' },
      { ...data.cancellationRate, theme: '#f9f5f5', label: 'Cancellation Rate', icon: 'event_busy' }
    ];
  });

  breakdown = computed(() => this.dashboardService.adminData()?.breakdownToday);

  ngOnInit() {
    this.dashboardService.getAdminDashboard().subscribe();
  }

}
