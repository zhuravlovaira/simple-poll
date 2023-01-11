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
import { noWhitespace } from 'src/libs/utils/validators/no-whitespace/no-whitespace.validator';
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
  @Output() answerDelete = new EventEmitter<number>();
  @Output() answersReset = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  readonly maxAnswersAmount = 10;
  readonly maxCharactersAmount = 80;
  readonly debounceTime = 300;

  readonly form = new FormGroup({
    question: new FormControl<string | null>(null, [
      Validators.maxLength(this.maxCharactersAmount),
      noWhitespace,
    ]),
    newAnswer: new FormControl<string | null>(null, [
      Validators.maxLength(this.maxCharactersAmount),
      noWhitespace,
    ]),
    answers: new FormArray<FormControl<string>>([]),
  });

  answers = this.form.get('answers') as FormArray;

  ngOnInit(): void {
    this.emitDataOnFormValuesChange();
  }

  addAnswer(value: string) {
    const trimmedValue = value?.trim();

    if (trimmedValue && this.form.get('newAnswer')?.valid) {
      this.answers.push(
        new FormControl(trimmedValue, [
          Validators.maxLength(this.maxCharactersAmount),
          Validators.required,
          noWhitespace,
        ])
      );

      this.form.get('newAnswer')?.reset();
      this.answerAdd.emit(value);
    }
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
    this.answerDelete.emit(index);
  }

  reset() {
    this.form.reset();
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
      .subscribe((question: string | null) => {
        const emitQuestion = question ? question : '';
        this.questionChange.next(emitQuestion);
      });
  }

  private emitDataOnAnswerChange() {
    this.form
      .get('answers')
      ?.valueChanges.pipe(takeUntil(this.destroy$), startWith([]), pairwise())
      .subscribe(([prevAnswers, nextAnswers]: [string[], string[]]) => {
        if (prevAnswers.length === nextAnswers.length) {
          let newValueIndex: number | undefined;
          for (const key in nextAnswers) {
            if (nextAnswers[key] !== prevAnswers[key]) {
              newValueIndex = +key;
              break;
            }
          }

          if (
            newValueIndex !== undefined &&
            this.answers.controls[newValueIndex]?.valid
          ) {
            this.answerChange.next({
              newValue: nextAnswers[newValueIndex].trim(),
              newValueIndex,
            });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
