import { Component, computed, effect, input, signal } from '@angular/core';

export interface StatItem {
  label: string;
  icon: string;
  value: number | null;
}

@Component({
  selector: 'app-summary-card',
  imports: [],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss',
})
export class SummaryCard {
  label = input.required<string>();
  icon = input.required<string>();
  value = input.required<number | null>();

  displayValue = signal(0);

  constructor() {
    effect(() => {
      this.animate();
    })
  }

  formattedValue = computed(() => this.displayValue().toLocaleString());

  private animate(): void {
    const target = this.value() ?? 0;
    const duration = 800;
    const start = performance.now();
    const easeOutQuad = (t: number) => t * (2 - t);

    const update = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);

      this.displayValue.set(Math.floor(eased * target));

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}
