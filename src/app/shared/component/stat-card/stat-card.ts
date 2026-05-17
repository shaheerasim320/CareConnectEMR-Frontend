import { NgClass } from '@angular/common';
import { Component, computed, effect, input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-stat-card',
  imports: [MatIconModule, NgClass],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  label = input.required<string>();
  value = input.required<number>();
  icon = input.required<string>();

  trendValue = input<number | null>(null);
  trendType = input<'Percent' | 'Number' | null>(null);
  trendDirection = input<'Up' | 'Down' | 'Neutral' | null>(null);
  comparison = input<'Yesterday' | 'Month' | 'Remaining' | 'Live' | 'Career' | null>(null);
  theme = input.required<string>();

  displayValue = signal(0);
  displayTrend = signal(0);

  constructor() {
    effect(() => {
      this.animate();
      console.group(`📊 StatCard: ${this.label()}`);
      console.table({
        Label: this.label(),
        Value: this.value(),
        Icon: this.icon(),
        TrendValue: this.trendValue(),
        TrendType: this.trendType(),
        TrendDirection: this.trendDirection(),
        Comparison: this.comparison(),
        Theme: this.theme(),
        HasTrend: this.hasTrend()
      });
      console.groupEnd();
    });
  }

  hasTrend = computed(() => this.trendValue() !== null);

  trendDisplay = computed(() => {
    const trend = this.displayTrend();

    if (this.trendType() === 'Percent') {
      return `${trend.toFixed(1)}%`;
    }

    if (this.trendType() === 'Number') {
      return `${Math.round(trend)}`;
    }

    return '';
  });

  comparisonText = computed(() => {
    switch (this.comparison()) {
      case 'Yesterday':
        return 'vs yesterday';

      case 'Month':
        return 'vs last month';

      case 'Remaining':
        return 'remaining';

      default:
        return '';
    }
  });

  formattedValue = computed(() => {
    return this.displayValue().toLocaleString();
  });

  animate() {
    const value = this.value() ?? 0;
    const trend = this.trendValue();

    const duration = 1200;
    const start = performance.now();

    const easeOutQuad = (t: number) => t * (2 - t);

    const update = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);

      this.displayValue.set(Math.floor(eased * value));

      if (trend !== null) {
        this.displayTrend.set(eased * trend);
      }

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

}
