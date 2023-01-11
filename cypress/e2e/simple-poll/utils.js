// Answers
export const answersInput = () => cy.get('[data-cy="answer-input"]');
export const newAnswerInput = () => cy.get('[data-cy="new-answer-input"]');
export const removeAnswerButton = () =>
  cy.get('[data-cy="remove-answer-button"]').first();
export const addAnswerButton = () =>
  cy.get('[data-cy="add-answer-button"]').first();
export const newAnswerNoWhitespaceError = () =>
  cy.get('[data-cy="new-answer-no-whitespace-error"]');
export const answerNoWhitespaceError = () =>
  cy.get('[data-cy="answer-no-whitespace-error"]');
export const questionNoWhitespaceError = () =>
  cy.get('[data-cy="question-no-whitespace-error"]');
export const answerFieldIsRequiredError = () =>
  cy.get('[data-cy="new-field-is-required-error"]');
export const resetButton = () => cy.get('[data-cy="reset-button"]');

export const QUESTION = 'What is the value of P?';
export const ANSWER_ONE = '3.14';
export const ANSWER_TWO = '3.15';
export const ANSWER_THREE = '3.1415';
export const DEFAULT_ANSWERS_LENGTH = 3;
export const UPDATED_ANSWERS = ['1', '2', '3'];
export const MAX_CHARACTERS_STRING =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.';
export const MAX_CHARACTERS_STRING_LENGTH = 80;

// Questions
export const VOTER_QUESTION = '[data-cy="voter-question"]';
export const CHART_QUESTION = '[data-cy="chart-question"]';
export const questionInput = () => cy.get('[data-cy="question-input"]').first();
export const voterQuestion = () => cy.get(VOTER_QUESTION).first();
export const chartQuestion = () => cy.get(CHART_QUESTION).first();

// Voter
const VOTE_RADIO_BUTTONS = '[data-cy="vote-radio-button"]';
export const voteRadioButton = () => cy.get(VOTE_RADIO_BUTTONS).first();
export const voteRadioButtons = () => cy.get(VOTE_RADIO_BUTTONS);
export const voteRadioButtonsLabels = () =>
  cy.get('[data-cy="vote-radio-button-label"]');
export const voteButton = () => cy.get('[data-cy="vote-button"]');
export const totalVotes = () => cy.get('[data-cy="total-votes"]');
export const makeChoiceMessage = () =>
  cy.get('[data-cy="make-choice-message"]');
export const warnMessage = () => cy.get('[data-cy="warm-message"]');

export const addDefaultAnswers = () => {
  newAnswerInput()
    .type(`${ANSWER_ONE}{enter}`)
    .type(`${ANSWER_TWO}{enter}`)
    .type(`${ANSWER_THREE}{enter}`);
  return answersInput();
};

export const voteDefaultAnswers = () => {
  voteRadioButtons().eq(0).click();
  voteButton().click();
  voteRadioButtons().eq(1).click();
  voteButton().click();
  voteRadioButtons().eq(2).click();
  voteButton().click();
};

export const updateDefaultAnswers = () => {
  for (const key in UPDATED_ANSWERS) {
    answersInput().eq(key).clear().type(UPDATED_ANSWERS[key]);
  }
};

export const addCustomAnswers = (answers) => {
  let typeString = '';
  answers.forEach((answer) => {
    typeString = typeString + `${answer}{enter}`;
  });
  newAnswerInput().type(typeString);
  return answersInput();
};

export const addAnswer = (answer) => {
  return newAnswerInput().type(`${answer}{enter}`);
};
