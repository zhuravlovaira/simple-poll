import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  pairwise,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { AnswerChangeParams } from './answer-change-params.interface';

@Component({
  selector: 'app-poll-creator',
  templateUrl: './poll-creator.component.html',
  styleUrls: ['./poll-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollCreatorComponent implements OnInit, OnDestroy {
  @Output() questionChange = new EventEmitter<string>();
  @Output() answerChange = new EventEmitter<AnswerChangeParams>();
  @Output() answerAdd = new EventEmitter<string>();
  @Output() answerDelete = new EventEmitter<string>();
  @Output() answersReset = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  readonly maxAnswersAmount = 3;
  readonly maxCharactersAmount = 3;
  readonly debounceTime = 300;

  // TODO: newAnswer add noEmpty
  readonly form = new FormGroup({
    question: new FormControl(null, [
      Validators.maxLength(this.maxCharactersAmount),
    ]),
    newAnswer: new FormControl(null, [
      Validators.maxLength(this.maxCharactersAmount),
    ]),
    answers: new FormArray([]),
  });

  answers = this.form.get('answers') as FormArray;

  ngOnInit(): void {
    this.emitDataOnFormValuesChange();
  }

  addAnswer(value: string) {
    const trimmedValue = value.trim();

    if (trimmedValue && this.form.get('newAnswer')?.valid) {
      this.answers.push(
        new FormControl(trimmedValue, [
          Validators.maxLength(this.maxCharactersAmount),
          Validators.required,
        ])
      );
      this.form.get('newAnswer')?.reset();
      this.answerAdd.emit(value);
    }
  }

  removeAnswer(index: number, answer: FormControl) {
    this.answers.removeAt(index);
    this.answerDelete.emit(answer.value);
  }

  reset() {
    this.answers.clear();
    this.answersReset.emit();
  }

  private emitDataOnFormValuesChange() {
    this.emitDataOnQuestionChange();
    this.emitDataOnAnswerChange();
  }

  private emitDataOnQuestionChange() {
    this.form
      .get('question')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(this.debounceTime),
        filter(() => !!this.form.get('question')?.valid)
      )
      .subscribe((question: any) => {
        // TODO: type
        this.questionChange.next(question);
      });
  }

  private emitDataOnAnswerChange() {
    this.form
      .get('answers')
      ?.valueChanges.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(this.debounceTime),
        startWith([]),
        pairwise()
      )
      .subscribe(([prevAnswers, nextAnswers]: [string[], string[]]) => {
        if (prevAnswers.length === nextAnswers.length) {
          const newValue = nextAnswers.filter(
            (answer: string) => !prevAnswers.includes(answer)
          )[0];
          const newValueIndex = nextAnswers.indexOf(newValue);

          if (this.answers.controls[newValueIndex]?.valid) {
            this.answerChange.next({ newValue, newValueIndex });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
