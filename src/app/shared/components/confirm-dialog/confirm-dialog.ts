import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type ConfirmDialogVariant = 'danger' | 'warning' | 'primary'

export interface ConfirmDialogConfig {
  icon: string;
  title: string;
  message: string;
  confirmLabel: string;
  variant: ConfirmDialogVariant;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatIconModule, NgClass],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  config = input.required<ConfirmDialogConfig>();
  confirmed = output<void>();
  cancelled = output<void>();
}
