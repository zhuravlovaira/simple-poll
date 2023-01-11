/// <reference types="cypress" />
import {
  addDefaultAnswers,
  answersInput,
  ANSWER_ONE,
  newAnswerInput,
  QUESTION,
  questionInput,
  resetButton,
  totalVotes,
  voteDefaultAnswers,
  voteRadioButton,
  voteRadioButtons,
  warnMessage,
} from './utils';

describe('Reset', () => {
  beforeEach(() => {
    cy.visit('/');
    addDefaultAnswers();
    voteDefaultAnswers();
    voteRadioButton().click();
    newAnswerInput().type(ANSWER_ONE);
    questionInput().type(QUESTION);
    resetButton().click();
  });

  it('should reset answers form, new answer input, question', () => {
    answersInput().should('not.exist');
    newAnswerInput().should('have.value', '');
    questionInput().should('have.value', '');
  });

  it('should reset votes, total votes and vote message', () => {
    voteRadioButtons().should('not.exist');
    totalVotes().should('contain', 0);
    warnMessage().should('exist');
  });
});
