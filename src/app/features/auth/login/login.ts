import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '../../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  private readonly snackbar = inject(Snackbar);
  private readonly route = inject(ActivatedRoute);


  hidePassword: boolean = true;
  loading: boolean = false;

  loginForm = this.fb.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  onSubmit() {

    if (this.loginForm.invalid) {
      this.snackbar.warning('Please fill all fields');
      return;
    }

    this.loading = true;

    const data = this.loginForm.getRawValue();

    this.authService.login(data).subscribe({
      next: (res) => {

        this.loading = false;

        this.snackbar.success('Login successful');

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';

        this.router.navigateByUrl(returnUrl);
      },

      error: (err) => {

        this.loading = false;
        if (err.status === 0) {
          this.snackbar.error('Cannot connect to the server');
        } else {
          this.snackbar.error('Invalid credentials');
        }
      }
    });

  }

}
