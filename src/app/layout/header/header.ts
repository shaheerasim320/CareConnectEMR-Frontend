import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Layout } from '../../core/services/layout';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  authService = inject(Auth);
  private layoutService = inject(Layout);
  user = this.authService.currentUser;
  isProfileOpen: boolean = false;

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logout() {
    this.authService.logout().subscribe();
  }

  onToggleClick() {
    if (window.innerWidth >= 992) {
      this.layoutService.toggleDesktopSidebar();
    } else {
      this.layoutService.toggleMobileSidebar();
    }
  }
}
