import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RecentPatient } from '../../../../../../core/models/dashboard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recent-registrations',
  imports: [MatIconModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './recent-registrations.html',
  styleUrl: './recent-registrations.scss',
})
export class RecentRegistrations {
  patients = input.required<RecentPatient[]>();
  searchTerm = signal('');
  showSearch = signal(false);

  displayedColumns: string[] = ['patient', 'mrn', 'gender', 'registeredAt'];

  filteredPatients = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const data = this.patients();
    if (!term) return data;

    return data.filter(p =>
      p.fullName.toLowerCase().includes(term) ||
      p.mrn.toLowerCase().includes(term)
    );
  });

  toggleSearch() {
    this.showSearch.update(v => !v);
    if (!this.showSearch()) this.searchTerm.set('');
  }

  downloadCsv() {
    const data = this.filteredPatients();
    if (data.length === 0) return;

    const headers = ['Patient Name', 'MRN', 'Gender', 'Registered At'];
    const rows = data.map(p => [
      p.fullName,
      p.mrn,
      p.gender,
      new Date(p.registeredAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Registrations_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  }
}
