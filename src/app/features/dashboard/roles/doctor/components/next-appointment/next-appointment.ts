import { Component, input, output } from '@angular/core';
import { NextAppointment as Appointment } from '../../../../models';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-next-appointment',
  imports: [MatIconModule, DatePipe, RouterLink, NgClass],
  templateUrl: './next-appointment.html',
  styleUrl: './next-appointment.scss',
})
export class NextAppointment {
  data = input.required<Appointment | null>();
  isLoading = input(false);
  complete = output<string>();
  notes = output<string>();

  getDayLabel(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const sameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (sameDay(date, today)) return 'Today';
    if (sameDay(date, tomorrow)) return 'Tomorrow';

    const diffDays = Math.ceil((date.getTime() - today.setHours(0,0,0,0)) / 86400000);
    if (diffDays <= 7) return date.toLocaleDateString('en-US', { weekday: 'long' });

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      Scheduled: 'Scheduled',
      CheckedIn: 'Checked In',
      Completed: 'Completed',
      Cancelled: 'Cancelled',
    };
    return map[status] ?? status;
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
  }

  onComplete(): void {
    if (this.data()) this.complete.emit(this.data()!.id);
  }

  onNotes(): void {
    if (this.data()) this.notes.emit(this.data()!.id);
  }
}
