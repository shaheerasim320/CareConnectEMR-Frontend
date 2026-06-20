import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  authService = inject(AuthService);
  private layoutService = inject(LayoutService);
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
