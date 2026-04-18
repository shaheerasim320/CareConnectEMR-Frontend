import { Component, computed, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { DoctorDashboard } from './components/doctor-dashboard/doctor-dashboard';
import { ReceptionistDashboard } from './components/receptionist-dashboard/receptionist-dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [AdminDashboard,DoctorDashboard,ReceptionistDashboard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authService = inject(Auth);
  userRole = computed(()=> this.authService.currentUser()?.role);
}
