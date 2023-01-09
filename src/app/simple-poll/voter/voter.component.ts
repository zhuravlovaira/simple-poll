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
    this.selectedIndex = null;
    if (answers) {
      this.answersKeys = answers.map((answer: Answer) => answer.answer);
    }
  }
  @Output() addVote = new EventEmitter<number>();

  readonly minimumItems = 2;
  selectedIndex: number | undefined | null;
  answersKeys: string[] = [];

  vote() {
    if (
      typeof this.selectedIndex !== 'undefined' &&
      this.selectedIndex !== null
    ) {
      this.addVote.next(this.selectedIndex);
      this.selectedIndex = null;
    }
  }
}
