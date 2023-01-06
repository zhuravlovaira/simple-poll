import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
  styleUrls: ['./poll-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollChartComponent {
  @Input() question: string = '';
}
