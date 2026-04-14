import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('care-connect-emr');
  private readonly authService = inject(Auth);

  ngOnInit() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.authService.loadCurrentUser().subscribe({
        error: (err) => {
          if (err.status === 401) {
            this.authService.logout();
          }
        }
      });
    }
  }

}
