import { NgClass } from '@angular/common';
import { Component, computed, effect, input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-stat-card',
  imports: [MatIconModule, NgClass],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard{

  label = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
  trend = input.required<string | number>();
  trendDirection = input.required<'up' | 'down' | 'neutral'>();
  theme = input.required<string>();

  displayValue = signal(0);
  displayTrend = signal(0);

  constructor() {
    effect(() => {
      this.animate();
    });
  }

  trendDisplay = computed(() => {
    const value = this.displayTrend().toFixed(1);

    switch (this.trendDirection()) {
      case 'up':
        return `+${value}%`;
      case 'down':
        return `-${value}%`;
      default:
        return `${value}%`;
    }
  });

  formattedValue = computed(() => {
    return this.displayValue().toLocaleString();
  });

  animate() {
    const rawValue = this.value() ?? '0';
    const rawTrend = this.trend() ?? '0';

    const cleanValue = Number(rawValue.toString().replace(/,/g, '')) || 0;
    const cleanTrend = parseFloat(rawTrend.toString().replace(/[^0-9.]/g, '')) || 0;

    const easeOutQuad = (t: number) => t * (2 - t);

    const duration = 1500;
    const start = performance.now();

    const update = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      this.displayValue.set(Math.floor(easedProgress * cleanValue));
      this.displayTrend.set(easedProgress * cleanTrend);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

}
