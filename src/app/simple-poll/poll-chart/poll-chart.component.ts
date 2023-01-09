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
    const votes = [...answers.map((answer: Answer) => answer.votes)];

    this.totalVotes = votes.reduce((sum, a) => sum + a, 0);
    this.basicData = {
      labels: [
        ...answers.map((answer: Answer) =>
          answer.answer.length > 5
            ? `${answer.answer.substring(0, this.maxLabelCharacters)}...`
            : answer.answer
        ),
      ],
      datasets: [
        {
          label: 'Votes',
          backgroundColor: '#42A5F5',
          data: votes,
        },
      ],
    };
  }
  basicData: any;
  totalVotes: number = 0;
  readonly maxLabelCharacters = 10;
}
