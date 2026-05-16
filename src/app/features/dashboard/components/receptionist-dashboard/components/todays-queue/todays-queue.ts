import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentQueue } from '../../../../../../core/models/dashboard';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todays-queue',
  imports: [MatIconModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './todays-queue.html',
  styleUrl: './todays-queue.scss',
})
export class TodaysQueue {
  todaysQueue = input.required<AppointmentQueue[]>();
  searchTerm = signal('');
  showSearch = signal(false);

  displayedColumns: string[] = ['patient', 'time', 'doctor', 'reason', 'status'];

  filteredQueue = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const data = this.todaysQueue();
    if (!term) return data;

    return data.filter(q =>
      q.patientName.toLowerCase().includes(term) ||
      q.patientMRN.toLowerCase().includes(term) ||
      q.doctorName.toLowerCase().includes(term)
    );
  });

  toggleSearch() {
    this.showSearch.update(v => !v);
    if (!this.showSearch()) this.searchTerm.set('');
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  }

}
