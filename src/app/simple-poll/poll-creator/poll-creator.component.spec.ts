import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { noWhitespace } from 'src/libs/utils/validators/no-whitespace/no-whitespace.validator';
import { PollCreatorComponent } from './poll-creator.component';

describe('PollCreatorComponent', () => {
  let component: PollCreatorComponent;

  beforeEach(async () => {
    component = new PollCreatorComponent();
    spyOn(component.questionChange, 'next');
    spyOn(component.answerChange, 'next');

    component.ngOnInit();
    component.answers?.push(new FormControl('123', [noWhitespace]));
  });

  it('should emit data OnQuestionChange', fakeAsync(() => {
    const question = 'Qestion?';
    component.form.get('question')?.setValue(question);

    tick(component.debounceTime);
    expect(component.questionChange.next).toHaveBeenCalledWith(question);
  }));

  it('should emit data OnAnswerChange', () => {
    const updatedAnswer = '555';
    const updatedAnswerIndex = 0;

    component.answers.controls[updatedAnswerIndex].patchValue(updatedAnswer);
    expect(component.answerChange.next).toHaveBeenCalledWith({
      newValue: updatedAnswer,
      newValueIndex: updatedAnswerIndex,
    });
  });

  it('should NOT emit data OnAnswerChange if an answer was added or removed', () => {
    expect(component.answerChange.next).not.toHaveBeenCalled();
  });

  it('should NOT emit data OnAnswerChange if an answer control is invalid', () => {
    const updatedAnswer = '  ';
    const updatedAnswerIndex = 0;

    component.answers.controls[updatedAnswerIndex].patchValue(updatedAnswer);
    expect(component.answerChange.next).not.toHaveBeenCalled();
  });

  it('addAnswer method should add new answer control to the form', () => {
    const newAnswer = 'qwerty';
    component.addAnswer(newAnswer);
    expect(component.answers.controls.length).toEqual(2);
  });

  it('addAnswer method should NOT add new answer control to the form if newAnswer control is invalid', () => {
    component.form.get('newAnswer')?.setErrors({ maxLength: true });
    component.addAnswer('qwerty');
    expect(component.answers.controls.length).toEqual(1);
  });
});
