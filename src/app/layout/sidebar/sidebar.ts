import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Auth } from '../../core/services/auth';
import { NAV_ITEMS } from '../../core/navigation/navigation';
import { MatIcon } from "@angular/material/icon";
import { Layout } from '../../core/services/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIcon, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private authService = inject(Auth);
  layoutService = inject(Layout);
  private navItems = NAV_ITEMS;
  user = this.authService.currentUser;

  visibleNavItems = computed(() => {
    const role = this.authService.currentUser()?.role;

    return this.navItems.filter(item =>
      item.roles.includes(role ?? '')
    );
  });

  logout() {
    this.authService.logout().subscribe();
  }
}
