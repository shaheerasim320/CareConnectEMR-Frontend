import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminDashboardResponse } from '../../../core/models/dashboard';
import { ApiResponse } from '../../../core/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  private api = `${environment.apiUrl}/Dashboard`;
  private readonly http = inject(HttpClient);

  adminData = signal<AdminDashboardResponse | null>(null);
  isLoading = signal<boolean>(false);

  getAdminDashboard() {
    this.isLoading.set(true);
    return this.http.get<ApiResponse<AdminDashboardResponse>>(`${this.api}/summary`)
      .pipe(
        tap({
          next: (data) => {
            this.adminData.set(data.data);
            this.isLoading.set(false);
          },
          error: () => this.isLoading.set(false)
        })
      );
  }
}
