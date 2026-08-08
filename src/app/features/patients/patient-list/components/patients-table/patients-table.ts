import { Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Patient } from '../../../models';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatCell } from "@angular/material/table";
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-patients-table',
  imports: [MatIconModule, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatCell, NgClass, CommonModule],
  templateUrl: './patients-table.html',
  styleUrl: './patients-table.scss',
})
export class PatientsTable {
  patients = input.required<Patient[]>();
  totalCount = input.required<number>();
  page = input.required<number>();
  pageSize = input.required<number>();
  canManageStatus = input(false);
  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly statusChange = output<Patient>();

  readonly rangeLabel = computed(() => {
    const total = this.totalCount();
    if (total === 0) return 'No patients found';
    const first = (this.page() - 1) * this.pageSize() + 1;
    const last = Math.min(first + this.patients().length - 1, total);
    return `Showing ${first}–${last} of ${total}`;
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalCount() / this.pageSize())));
  readonly pages = computed(() => {
    const total = this.totalPages();
    const current = this.page();
    const start = Math.max(1, Math.min(current - 2, total - 4));
    const end = Math.min(total, start + 4);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  });

  displayedColumns: string[] = ['mrn', 'fullName', 'age', 'gender', 'phoneNumber', 'bloodType', 'status', 'registered', 'actions']

  getIntials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.page()) this.pageChange.emit(page);
  }

  changePageSize(value: string): void {
    this.pageSizeChange.emit(Number(value));
  }

  isActive(status: string): boolean {
    return status.toLowerCase() == 'active'
  }

}
