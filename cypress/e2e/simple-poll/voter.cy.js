/// <reference types="cypress" />
import {
  addAnswer,
  addDefaultAnswers,
  ANSWER_ONE,
  ANSWER_THREE,
  ANSWER_TWO,
  DEFAULT_ANSWERS_LENGTH,
  makeChoiceMessage,
  removeAnswerButton,
  totalVotes,
  updateDefaultAnswers,
  UPDATED_ANSWERS,
  voteButton,
  voteRadioButton,
  voteRadioButtons,
  voteRadioButtonsLabels,
  warnMessage,
} from './utils';

describe('Voter', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('enable voting if contains at least 2 items', () => {
    addAnswer(ANSWER_ONE);
    voteRadioButtons().should('have.length', 1);
    voteRadioButton().find('input').should('be.disabled');
    voteButton().should('be.disabled');

    addAnswer(ANSWER_TWO);
    voteRadioButtons().should('have.length', 2);
    voteRadioButton().find('input').should('be.enabled');
    voteRadioButton().click();
    voteButton().should('be.enabled');
  });

  it('should be able to vote', () => {
    addDefaultAnswers();
    voteRadioButton().click();
    voteRadioButton().find('input').should('be.checked');
    voteButton().should('be.enabled').click();
    voteRadioButton().find('input').should('not.be.checked');
  });

  it('updates total votes', () => {
    addDefaultAnswers();
    voteRadioButton().click();
    voteButton().should('be.enabled').click();

    totalVotes().should('contain', 1);

    voteRadioButton().click();
    voteButton().should('be.enabled').click();

    totalVotes().should('contain', 2);
  });

  it('updates info message', () => {
    addAnswer(ANSWER_ONE);
    warnMessage().should('exist');
    makeChoiceMessage().should('not.exist');
    addAnswer(ANSWER_TWO);
    warnMessage().should('not.exist');
    makeChoiceMessage().should('exist');

    removeAnswerButton().click();
    warnMessage().should('exist');
    makeChoiceMessage().should('not.exist');
  });

  it('deletes item if answer was deleted', () => {
    addDefaultAnswers();
    voteRadioButtons().should('have.length', DEFAULT_ANSWERS_LENGTH);
    removeAnswerButton().click();

    voteRadioButtons().should('have.length', DEFAULT_ANSWERS_LENGTH - 1);
  });

  it('updates item if answer was updated', () => {
    addDefaultAnswers();
    voteRadioButtonsLabels().eq(0).should('contain', ANSWER_ONE);
    voteRadioButtonsLabels().eq(1).should('contain', ANSWER_TWO);
    voteRadioButtonsLabels().eq(2).should('contain', ANSWER_THREE);

    updateDefaultAnswers();
    for (const key in UPDATED_ANSWERS) {
      voteRadioButtonsLabels().eq(key).should('contain', UPDATED_ANSWERS[key]);
    }
  });
});
