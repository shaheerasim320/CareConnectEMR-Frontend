import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DoctorLoad } from '../../../../../../core/models/dashboard';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-doctors',
  imports: [MatIconModule, MatTableModule, CommonModule],
  templateUrl: './top-doctors.html',
  styleUrl: './top-doctors.scss',
})
export class TopDoctors {
  doctors = input.required<DoctorLoad[]>();

  displayedColumns: string[] = ['doctor', 'load', 'progress'];

  getInitials(name: string):string {
    if (!name) return '';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  }

}
