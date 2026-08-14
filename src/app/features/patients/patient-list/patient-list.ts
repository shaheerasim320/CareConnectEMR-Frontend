import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientStats, PatientStatus } from '../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatItem, SummaryCard } from '../../../shared/components/summary-card/summary-card';
import { SummaryCardSkeleton } from '../../../shared/components/summary-card/summary-card-skeleton';
import { STAT_CONFIG } from './patient-list.config';
import { MatIconModule } from '@angular/material/icon';
import { PERMISSIONS } from '../../../core/auth/permissions';
import { hasPermission } from '../../../core/auth/role-permissions';
import { PatientsTable } from './components/patients-table/patients-table';
import { PatientsTableSkeleton } from './components/patients-table/patients-table-skeleton';
import { Patient } from '../models';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { ConfirmDialog, ConfirmDialogConfig } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  imports: [ReactiveFormsModule, MatIconModule, SummaryCard, SummaryCardSkeleton, PatientsTable, PatientsTableSkeleton, ConfirmDialog],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss',
})
export class PatientList implements OnInit {
  readonly patientService = inject(PatientService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackbar = inject(SnackbarService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly searchControl = new FormControl('');
  readonly searchValue = signal('');

  readonly statusFilter = signal<PatientStatus | 'All'>('All');
  readonly selectedStatus = signal<PatientStatus | 'All'>('All');

  readonly currentPage = signal(1);
  readonly currentPageSize = signal(10);

  readonly pendingStatusPatient = signal<Patient | null>(null);

  readonly PERMISSIONS = PERMISSIONS;

  readonly canManageStatus = computed(() =>
    hasPermission(this.authService.currentUser()?.role, PERMISSIONS.ManagePatientStatus)
  );

  canCreatePatient(): boolean {
    const userRole = this.authService.currentUser()?.role;
    return hasPermission(userRole, this.PERMISSIONS.CreatePatient);
  }

  readonly activeFilters = computed(() => {
    const filters: string[] = [];
    if (this.canManageStatus() && this.statusFilter() !== 'All') {
      filters.push(`Status: ${this.statusFilter()}`);
    }
    return filters;
  });

  readonly statCards = computed<StatItem[]>(() => {
    const stats = this.patientService.stats();
    if (!stats) return [];

    return Object.entries(STAT_CONFIG)
      .filter(([key]) => stats[key as keyof PatientStats] !== null)
      .map(([key, config]) => ({
        label: config.label,
        icon: config.icon,
        value: stats[key as keyof PatientStats],
      }));
  });

  ngOnInit(): void {
    this.patientService.loadStats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.searchControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(val => this.searchValue.set(val ?? ''));

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const page = this.toPositiveInt(params.get('page'), 1);
      const pageSize = this.toPageSize(params.get('pageSize'));
      const search = params.get('search') ?? '';
      const requestedStatus = params.get('status');
      const status: PatientStatus | 'All' = this.canManageStatus() && this.isPatientStatus(requestedStatus) ? requestedStatus : 'All';

      this.currentPage.set(page);
      this.currentPageSize.set(pageSize);
      this.searchControl.setValue(search, { emitEvent: false });
      this.searchValue.set(search);
      this.statusFilter.set(status);
      this.selectedStatus.set(status);
      this.loadPatients(page);
    });

  }

  onStatusChange(value: string): void {
    this.selectedStatus.set(value as PatientStatus | 'All');
  }

  applyFilters(): void {
    this.statusFilter.set(this.canManageStatus() ? this.selectedStatus() : 'All');
    this.updateListingUrl(1, this.currentPageSize(), this.canManageStatus() ? this.selectedStatus() : 'All');
  }

  clearFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.searchValue.set('');
    this.updateListingUrl(1, this.currentPageSize(), 'All');
  }

  onPageChange(page: number): void {
    this.updateListingUrl(page, this.currentPageSize(), this.statusFilter());
  }

  onPageSizeChange(pageSize: number): void {
    this.updateListingUrl(1, pageSize, this.statusFilter());
  }

  onPatientStatusChange(patient: Patient): void {
    this.pendingStatusPatient.set(patient);
  }

  confirmPatientStatusChange(): void {
    const patient = this.pendingStatusPatient();
    if (!patient) return;
    const nextStatus: PatientStatus = patient.status === 'Active' ? 'Deactivated' : 'Active';
    const action = nextStatus === 'Active' ? 'activate' : 'deactivate';

    this.patientService.updateStatus(patient.id, nextStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.pendingStatusPatient.set(null);
          this.snackbar.success(`Patient ${nextStatus.toLowerCase()} successfully.`);
          this.loadPatients(this.currentPage());
          this.patientService.loadStats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        },
        error: () => this.snackbar.error(`Unable to ${action} patient. Please try again.`),
      });
  }

  loadPatients(page = 1) {
    this.currentPage.set(page);
    const canManage = this.canManageStatus();
    const filter = this.statusFilter();

    this.patientService.loadList({
      page,
      pageSize: this.currentPageSize(),
      search: this.searchControl.value || undefined,
      includeAll: canManage ? filter === 'All' : undefined,
      status: canManage && filter !== 'All' ? filter : undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  private updateListingUrl(page: number, pageSize: number, status: PatientStatus | 'All'): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchControl.value?.trim() || null,
        status: this.canManageStatus() && status !== 'All' ? status : null,
        page: page === 1 ? null : page,
        pageSize: pageSize === 10 ? null : pageSize,
      },
      queryParamsHandling: 'merge',
    });
  }

  private toPositiveInt(value: string | null, fallback: number): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
  }

  private toPageSize(value: string | null): number {
    const parsed = this.toPositiveInt(value, 10);
    return [10, 25, 50].includes(parsed) ? parsed : 10;
  }

  private isPatientStatus(value: string | null): value is PatientStatus {
    return value === 'Active' || value === 'Deactivated';
  }

  readonly dialogConfig = computed<ConfirmDialogConfig | null>(() => {
    const patient = this.pendingStatusPatient();
    if (!patient) return null;
    const activate = patient.status === 'Deactivated';
    return {
      icon: activate ? 'person_check' : 'person_off',
      title: `${activate ? 'Activate' : 'Deactivate'}`,
      message: activate ? `<strong>${patient.fullName}</strong> will be restored to the active patient directory and can receive appointments again.` : `<strong>${patient.fullName}</strong>'s record will be deactivated. It remains available for authorized staff and can be reactivated later.`,
      confirmLabel: activate ? 'Activate' : 'Deactivate',
      variant: activate ? 'primary' : 'warning',
    };
  });

  readonly canSearch = computed(() =>
    !!(this.searchValue().trim()) || this.selectedStatus() !== 'All'
  );

  readonly hasActiveFilters = computed(() =>
    !!(this.searchValue().trim()) || (this.canManageStatus() && this.statusFilter() !== 'All')
  );

  viewPatient(patient: Patient): void {
    this.router.navigate([patient.id], {
      relativeTo: this.route
    });
  }

  readonly canExport = computed(() =>
    hasPermission(this.authService.currentUser()?.role, PERMISSIONS.ExportData)
  );
}
