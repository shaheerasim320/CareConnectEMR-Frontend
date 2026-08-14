import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { hasPermission } from '../../../core/auth/role-permissions';
import { PERMISSIONS } from '../../../core/auth/permissions';
import { ConfirmDialogConfig, ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { PatientAuditLog, PatientDetail as PatientDetailModel, PatientStatus } from '../models';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PatientDetailSkeleton } from "./patient-detail-skeleton";

@Component({
  selector: 'app-patient-detail',
  imports: [ConfirmDialog, MatIconModule, CommonModule, RouterLink, PatientDetailSkeleton],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.scss',
})
export class PatientDetail implements OnInit {
  readonly patientService = inject(PatientService);

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackbar = inject(SnackbarService);
  private readonly authService = inject(AuthService);

  readonly invalidId = signal(false);
  readonly notFound = signal(false);

  readonly canManageStatus = computed(() => hasPermission(this.authService.currentUser()?.role, PERMISSIONS.ManagePatientStatus));

  readonly canViewAuditLogs = computed(() => hasPermission(this.authService.currentUser()?.role, PERMISSIONS.ViewAuditLogs));

  readonly canUpdateContact = computed(() => hasPermission(this.authService.currentUser()?.role, PERMISSIONS.UpdatePatientContact));

  readonly canEditPatient = computed(() => hasPermission(this.authService.currentUser()?.role, (PERMISSIONS.UpdatePatientIdentity || PERMISSIONS.UpdatePatientContact || PERMISSIONS.UpdatePatientClinical)));

  readonly pendingStatus = signal<{ next: PatientStatus } | null>(null);

  readonly dialogConfig = computed<ConfirmDialogConfig | null>(() => {
    const pending = this.pendingStatus();
    const patient = this.patientService.selectedPatient();
    if (!pending || !patient) return null;

    const activate = pending.next === 'Active';
    return {
      icon: activate ? 'person_check' : 'person_off',
      title: activate ? 'Activate' : 'Deactivate',
      message: activate
        ? `<strong>${patient.firstName} ${patient.lastName}</strong> will be restored to the active patient directory and can receive appointments again.`
        : `<strong>${patient.firstName} ${patient.lastName}</strong>'s record will be deactivated. It remains available for authorized staff and can be reactivated later.`,
      confirmLabel: activate ? 'Activate' : 'Deactivate',
      variant: activate ? 'primary' : 'warning',
    };
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id || id.trim() === '') {
      this.invalidId.set(true);
      return;
    }

    this.patientService.getById(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (this.canViewAuditLogs()) {
          this.patientService.getAuditLogs(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ error: () => { } });
        }
      },
      error: (err) => {
        if (err?.status === 404) {
          this.notFound.set(true);
        } else {
          this.snackbar.error('Unable to load patient details. Please try again.');
        }
      }
    });
  }

  getActivityIcon(action: string, changedProperties: string): string {
    if (action === 'Added') return 'person_add';
    if (changedProperties.includes('Status')) return 'toggle_on';
    if (changedProperties.includes('PhoneNumber') || changedProperties.includes('Email')) return 'contact_page';
    if (changedProperties.includes('BloodType') || changedProperties.includes('Allergies')) return 'medical_information';
    if (changedProperties.includes('FirstName') || changedProperties.includes('LastName')) return 'edit';
    return 'update';
  }

  formatActivityLabel(log: PatientAuditLog): string {
    if (log.action === 'Added') return 'Patient Registered';
    if (log.changedProperties.includes('Status')) {
      try {
        const newVals = log.newValues ? JSON.parse(log.newValues) : null;
        return newVals?.Status === 1 ? 'Patient Deactivated' : 'Patient Activated';
      } catch { return 'Status Changed'; }
    }
    if (log.changedProperties.includes('PhoneNumber') || log.changedProperties.includes('Email')
      || log.changedProperties.includes('EmergencyContact')) return 'Contact Updated';
    if (log.changedProperties.includes('BloodType') || log.changedProperties.includes('Allergies')) return 'Clinical Info Updated';
    if (log.changedProperties.includes('FirstName') || log.changedProperties.includes('LastName')
      || log.changedProperties.includes('DateOfBirth') || log.changedProperties.includes('Gender')) return 'Identity Updated';
    return 'Record Updated';
  }

  onEditPatient(): void { }

  onToggleStatus(patient: PatientDetailModel): void {
    const next: PatientStatus = patient.status === 'Active' ? 'Deactivated' : 'Active';
    this.pendingStatus.set({ next });
  }

  confirmStatusChange(): void {
    const pending = this.pendingStatus();
    const patient = this.patientService.selectedPatient();
    if (!pending || !patient) return;

    const { next } = pending;
    const action = next === 'Active' ? 'activate' : 'deactivate';

    this.patientService
      .updateStatus(patient.id, next)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.pendingStatus.set(null);
          this.patientService.selectedPatient.update(p => p ? { ...p, status: next } : p);
          this.snackbar.success(`Patient ${next.toLowerCase()} successfully.`);
        },
        error: () => {
          this.snackbar.error(`Unable to ${action} patient. Please try again.`);
        },
      });
  }

  onAddEmergencyContact(): void {
    // TODO: open add emergency contact modal
  }
}