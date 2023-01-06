import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-poll-creator',
  templateUrl: './poll-creator.component.html',
  styleUrls: ['./poll-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollCreatorComponent implements OnInit {
  // TODO: set initial data from LS
  @Output() questionChange = new EventEmitter<string>();
  @Output() answersChange = new EventEmitter<string[]>();

  readonly maxAnswersAmount = 3;
  readonly debounceTime = 400;

  readonly form = new FormGroup({
    question: new FormControl(),
    newAnswer: new FormControl(),
    answers: new FormArray([]),
  });

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  ngOnInit(): void {
    this.emitDataOnFormValuesChange();
  }

  addAnswer(value: string | undefined | null) {
    if (value) {
      this.answers.push(new FormControl(value));
      this.form.get('newAnswer')?.reset();
    }
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  reset() {
    this.answers.clear();
  }

  private emitDataOnFormValuesChange() {
    this.form
      .get('question')
      ?.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(this.debounceTime)
      )
      .subscribe((question: string) => {
        this.questionChange.next(question);
      });

    this.form
      .get('answers')
      ?.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(this.debounceTime)
      )
      .subscribe((answers: string[]) => {
        this.answersChange.next(answers);
      });
  }
}
