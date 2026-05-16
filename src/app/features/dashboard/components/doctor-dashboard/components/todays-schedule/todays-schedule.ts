import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DoctorLoad, TodaySchedule } from '../../../../../../core/models/dashboard';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todays-schedule',
  imports: [MatIconModule, MatTableModule, CommonModule],
  templateUrl: './todays-schedule.html',
  styleUrl: './todays-schedule.scss',
})
export class TodaysSchedule {
  todaysSchedule = input.required<TodaySchedule[]>();

  displayedColumns: string[] = ['patient', 'time', 'status'];

  getInitials(name: string):string {
    if (!name) return '';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  }

}
