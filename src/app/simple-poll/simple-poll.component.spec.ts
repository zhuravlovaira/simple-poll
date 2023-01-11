import { SimplePollComponent } from './simple-poll.component';

describe('SimplePollComponent', () => {
  let component: SimplePollComponent;
  const initialAnswers = [
    { answer: '123', votes: 3 },
    { answer: 'qwerty', votes: 4 },
  ];

  beforeEach(async () => {
    component = new SimplePollComponent();
    component.answers$.next([...initialAnswers]);
    spyOn(component.answers$, 'next');
  });

  it('onAnswerChange method should update answers stream if answer exist', () => {
    const newValue = '1234';
    const newValueIndex = 0;
    component.onAnswerChange({ newValue, newValueIndex });
    initialAnswers[newValueIndex].answer = newValue;
    expect(component.answers$.next).toHaveBeenCalledWith(initialAnswers);
  });

  it('onAnswerAdd method should add new answer to the answers stream', () => {
    const newAnswer = '3.14';
    component.onAnswerAdd(newAnswer);
    expect(component.answers$.next).toHaveBeenCalledWith([
      ...initialAnswers,
      { answer: newAnswer, votes: 0 },
    ]);
  });

  it('onAnswerDelete method should delete an answer from the answers stream', () => {
    const answerIndex = 0;
    component.onAnswerDelete(answerIndex);
    initialAnswers.splice(answerIndex, 1);
    expect(component.answers$.next).toHaveBeenCalledWith(initialAnswers);
  });

  it('onAnswersReset method should delete all answers from the answers stream', () => {
    component.onAnswersReset();
    expect(component.answers$.next).toHaveBeenCalledWith([]);
  });

  it('onAddVote method should add a vote to the existing answer and update the answers stream', () => {
    const answerIndex = 0;
    component.onAddVote(answerIndex);
    initialAnswers[0].votes++;
    expect(component.answers$.next).toHaveBeenCalledWith(initialAnswers);
  });
});
