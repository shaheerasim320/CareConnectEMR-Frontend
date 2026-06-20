import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AdminDashboard } from './roles/admin/admin-dashboard';
import { DoctorDashboard } from './roles/doctor/doctor-dashboard';
import { ReceptionistDashboard } from './roles/receptionist/receptionist-dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [AdminDashboard,DoctorDashboard,ReceptionistDashboard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authService = inject(AuthService);
  userRole = computed(()=> this.authService.currentUser()?.role);
}
