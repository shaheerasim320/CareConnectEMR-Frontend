import { Component, inject } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-shell',
  imports: [Sidebar, Header, RouterOutlet],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  layoutService = inject(LayoutService);
}
