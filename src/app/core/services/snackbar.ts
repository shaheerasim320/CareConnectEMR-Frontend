import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  constructor(private snackBar: MatSnackBar){}

  private config(panelClass: string): MatSnackBarConfig {
    return {
      duration:         4000,
      horizontalPosition: 'right',
      verticalPosition:   'bottom',
      panelClass:       [panelClass]
    }
  }

  success(message: string): void {
    this.snackBar.open(
      `✓  ${message}`,
      'Dismiss',
      this.config('snack-success')
    );
  }

  error(message: string): void {
    this.snackBar.open(
      `✕  ${message}`,
      'Dismiss',
      this.config('snack-error')
    );
  }

  warning(message: string): void {
    this.snackBar.open(
      `⚠  ${message}`,
      'Dismiss',
      this.config('snack-warning')
    );
  }
}
