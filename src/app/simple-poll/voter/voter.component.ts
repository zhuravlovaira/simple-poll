import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Answer } from '../answer.interface';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoterComponent {
  @Input() question: string = '';
  @Input() set answers(answers: Answer[]) {
    if (answers) {
      this.answersKeys = answers.map((answer: Answer) => answer.answer);
    }
  }
  @Output() addVote = new EventEmitter<string>();

  selectedAnswer: string = '';
  answersKeys: string[] = [];

  vote() {
    this.addVote.next(this.selectedAnswer);
    this.selectedAnswer = '';
  }
}
