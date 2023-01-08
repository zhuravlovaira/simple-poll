import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer } from './answer.interface';
import { AnswerChangeParams } from './poll-creator/answer-change-params.interface';

@Component({
  selector: 'app-simple-poll',
  templateUrl: './simple-poll.component.html',
  styleUrls: ['./simple-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplePollComponent {
  question: string = '';
  answers$: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>([]);

  onQuestionChange(question: string) {
    this.question = question;
  }

  onAnswerChange(params: AnswerChangeParams) {
    const answers = this.answers$.getValue();
    const oldAnswer = answers[params.newValueIndex].answer;

    if (oldAnswer) {
      answers[params.newValueIndex].answer = params.newValue;
      this.answers$.next([...answers]);
    }
  }

  onAnswerAdd(answer: string) {
    const answers = this.answers$.getValue();
    answers.push({ answer, votes: 0 });
    this.answers$.next([...answers]);
  }

  onAnswerDelete(answer: string) {
    const answers = this.answers$.getValue();
    const newAnswers = answers.filter(
      (oldAnswer: Answer) => oldAnswer.answer !== answer
    );
    this.answers$.next([...newAnswers]);
  }

  onAnswersReset() {
    this.answers$.next([]);
  }

  onAddVote(answer: string) {
    const answers = this.answers$.getValue();
    const answerIndex = answers.findIndex(
      (targetAnswer: Answer) => targetAnswer.answer === answer
    );
    answers[answerIndex].votes++;
    this.answers$.next([...answers]);
  }
}
