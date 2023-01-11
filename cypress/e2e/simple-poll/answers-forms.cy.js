/// <reference types="cypress" />
import {
  addAnswer,
  addAnswerButton,
  addCustomAnswers,
  addDefaultAnswers,
  answerFieldIsRequiredError,
  answerNoWhitespaceError,
  answersInput,
  ANSWER_ONE,
  ANSWER_TWO,
  DEFAULT_ANSWERS_LENGTH,
  MAX_CHARACTERS_STRING,
  MAX_CHARACTERS_STRING_LENGTH,
  newAnswerInput,
  newAnswerNoWhitespaceError,
  removeAnswerButton,
  totalVotes,
  updateDefaultAnswers,
  UPDATED_ANSWERS,
  voteDefaultAnswers,
} from './utils';

describe('Answers forms', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('adds item on click "add-button" or "enter"', () => {
    newAnswerInput().type(`${ANSWER_ONE}{enter}`);
    answersInput()
      .should('have.length', 1)
      .first()
      .should('have.value', ANSWER_ONE);

    newAnswerInput().type(ANSWER_TWO);
    addAnswerButton().click();
    answersInput()
      .should('have.length', 2)
      .last()
      .should('have.value', ANSWER_TWO);
  });

  it('can have maximum of 10 items', () => {
    const maxAnswersArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    addCustomAnswers(maxAnswersArray)
      .should('have.length', 10)
      .first()
      .should('have.value', maxAnswersArray[0]);
    answersInput()
      .last()
      .should('have.value', maxAnswersArray[maxAnswersArray.length - 1]);
    newAnswerInput().should('not.exist');
  });

  it('can delete answers', () => {
    addDefaultAnswers().should('have.length', DEFAULT_ANSWERS_LENGTH);
    removeAnswerButton().click();
    answersInput()
      .should('have.length', DEFAULT_ANSWERS_LENGTH - 1)
      .and('not.contain', ANSWER_ONE);
  });

  it('should update total votes property after deleting an answer', () => {
    totalVotes().should('contain', 0);
    addDefaultAnswers();
    voteDefaultAnswers();
    totalVotes().should('contain', 3);
  });

  it('can update answers', () => {
    addDefaultAnswers();
    updateDefaultAnswers();

    answersInput().eq(0).should('have.value', UPDATED_ANSWERS[0]);
    answersInput().eq(1).should('have.value', UPDATED_ANSWERS[1]);
    answersInput().eq(2).should('have.value', UPDATED_ANSWERS[2]);
  });

  it('"new answer" input and answer input can contain maximum 80 characters', () => {
    addAnswer(MAX_CHARACTERS_STRING);
    answersInput()
      .eq(0)
      .should('have.value', MAX_CHARACTERS_STRING)
      .invoke('val')
      .should('have.length', MAX_CHARACTERS_STRING_LENGTH);

    addAnswer(MAX_CHARACTERS_STRING + 'a');
    answersInput()
      .eq(1)
      .should('have.value', MAX_CHARACTERS_STRING)
      .invoke('val')
      .should('have.length', MAX_CHARACTERS_STRING_LENGTH);
  });

  context('Input errors', () => {
    const invalidAnswer = '   ';

    it('displays error if answer input is invalid', () => {
      addDefaultAnswers();
      answersInput()
        .first()
        .clear()
        .type(invalidAnswer)
        .should('have.value', invalidAnswer);

      answersInput().first().should('exist');
      answerNoWhitespaceError().should('be.visible');

      answersInput().first().clear();
      answersInput().first().should('exist');
      answerFieldIsRequiredError().should('be.visible');
    });

    it('displays error and disables an "add button" if "new answer" input is invalid', () => {
      addAnswer(invalidAnswer).should('have.value', invalidAnswer);

      answersInput().should('not.exist');
      newAnswerNoWhitespaceError().should('be.visible');
      addAnswerButton().should('be.disabled');
    });
  });
});
