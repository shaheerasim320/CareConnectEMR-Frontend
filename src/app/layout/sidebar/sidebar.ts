import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { NAV_ITEMS } from '../../core/navigation/navigation';
import { MatIcon } from "@angular/material/icon";
import { LayoutService } from '../../core/services/layout.service';
import { CommonModule } from '@angular/common';
import { hasPermission } from '../../core/auth/role-permissions';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIcon, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);
  private navItems = NAV_ITEMS;
  user = this.authService.currentUser;

  visibleNavItems = computed(() => {
    const role = this.authService.currentUser()?.role;

    return this.navItems.filter(item =>
      hasPermission(role, item.permission)
    );
  });

  logout() {
    this.authService.logout().subscribe();
  }
}
