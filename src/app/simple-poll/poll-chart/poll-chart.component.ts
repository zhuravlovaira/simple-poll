import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Answer } from '../answer.interface';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
  styleUrls: ['./poll-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollChartComponent {
  @Input() question: string = '';
  @Input() set answers(answers: Answer[]) {
    this.basicData = {
      labels: [...answers.map((answer: Answer) => answer.answer)],
      datasets: [
        {
          label: 'Votes',
          backgroundColor: '#42A5F5',
          data: [...answers.map((answer: Answer) => answer.votes)],
        },
      ],
    };
  }
  basicData: any;
}
