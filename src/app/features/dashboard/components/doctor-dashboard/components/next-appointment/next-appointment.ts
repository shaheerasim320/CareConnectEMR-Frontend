import { Component, input } from '@angular/core';
import { NextAppointment as Appointment } from '../../../../../../core/models/dashboard';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-next-appointment',
  imports: [MatIconModule, CommonModule],
  templateUrl: './next-appointment.html',
  styleUrl: './next-appointment.scss',
})
export class NextAppointment {
  data = input.required<Appointment | null>();
}
