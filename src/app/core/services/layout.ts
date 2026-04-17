import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Layout {
  private _isCollapsed = signal(false);
  private _isMobileOpen = signal(false);

  isCollapsed = this._isCollapsed.asReadonly();
  isMobileOpen = this._isMobileOpen.asReadonly();

  toggleDesktopSidebar() {
    this._isCollapsed.update((val) => !val);
  }

  toggleMobileSidebar() {
    this._isMobileOpen.update((val) => !val);
  }

  closeMobile() {
    this._isMobileOpen.set(false);
  }
}
