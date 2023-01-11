/// <reference types="cypress" />
import {
  chartQuestion,
  CHART_QUESTION,
  MAX_CHARACTERS_STRING,
  MAX_CHARACTERS_STRING_LENGTH,
  QUESTION,
  questionInput,
  questionNoWhitespaceError,
  voterQuestion,
  VOTER_QUESTION,
} from './utils';

describe('Question input', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should update voter and chart block on input', () => {
    const debounceTime = 300;

    questionInput().type(QUESTION);
    voterQuestion().should('contain', QUESTION);
    chartQuestion().should('contain', QUESTION);

    questionInput().clear();
    cy.wait(debounceTime);
    cy.get(VOTER_QUESTION).should('not.exist');
    cy.get(CHART_QUESTION).should('not.exist');
  });

  it('can contain maximum 80 characters', () => {
    questionInput().type(MAX_CHARACTERS_STRING);
    questionInput()
      .should('have.value', MAX_CHARACTERS_STRING)
      .invoke('val')
      .should('have.length', MAX_CHARACTERS_STRING_LENGTH);

    questionInput().type(MAX_CHARACTERS_STRING + 'a');
    questionInput()
      .should('have.value', MAX_CHARACTERS_STRING)
      .invoke('val')
      .should('have.length', MAX_CHARACTERS_STRING_LENGTH);
  });

  it('displays error if question input is invalid', () => {
    const invalidAnswer = '   ';
    questionInput().type(invalidAnswer).should('have.value', invalidAnswer);
    questionNoWhitespaceError().should('be.visible');
  });
});
