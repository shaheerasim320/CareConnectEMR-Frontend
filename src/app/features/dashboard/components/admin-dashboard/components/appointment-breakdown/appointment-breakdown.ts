import { Component, computed, input } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexTooltip, NgApexchartsModule } from 'ng-apexcharts';
import { AppointmentBreakdown as AppointmentData} from '../../../../../../core/models/dashboard';
import { MatIconModule } from '@angular/material/icon';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  labels: string[];
  colors: string[];
};

@Component({
  selector: 'app-appointment-breakdown',
  imports: [NgApexchartsModule,MatIconModule],
  templateUrl: './appointment-breakdown.html',
  styleUrl: './appointment-breakdown.scss',
})
export class AppointmentBreakdown {
  data = input.required<AppointmentData>();

  chartOptions = computed<ChartOptions>(() => {
    const d = this.data();
    
    return {
      series: [d.scheduled, d.checkedIn, d.cancelled], 
      chart: {
        type: 'donut',
        height: 220,
        animations: { enabled: true }
      },
      labels: ['Scheduled', 'Checked In', 'Cancelled'],
      colors: ['#3b82f6', '#10b981', '#ef4444'],
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: (w: any) => w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
              }
            }
          }
        }
      },
      dataLabels: { enabled: false },
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    };
  });
}
