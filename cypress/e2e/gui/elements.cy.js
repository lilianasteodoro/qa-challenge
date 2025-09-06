/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Teste Formulário DemoQA', () => {

  beforeEach(() => {
    // Acessa a página principal e vai para o Practice Form
    cy.visit('https://demoqa.com/');
    cy.contains('Elements').click();
    cy.contains('Web Tables').click();
  });

  it('Preenche e submete o formulário ', () => {
    // Clicando no botão para addnovo item
    cy.get('#addNewRecordButton').click();

     // Preenchendo campos 
    cy.get('#firstName').type(faker.person.firstName()); 
    cy.get('#lastName').type(faker.person.lastName());
    cy.get('#userEmail').type(faker.internet.email());
    cy.get('#age').type('50');
    cy.get('#salary').type('1000');
    cy.get('#department').type('Computer Science');


    // Submeter formulário
    cy.get('#submit').click({ force: true });

    // Editando o item
    cy.get('#edit-record-4').click();

    // Limpando e preenchendo campos
    cy.get('#firstName').clear().type(faker.person.firstName());
    cy.get('#lastName').clear().type(faker.person.lastName());
    cy.get('#userEmail').clear().type(faker.internet.email());
    cy.get('#age').clear().type('55');
    cy.get('#salary').clear().type('2000');
    cy.get('#department').clear().type('Computer Science Two');

    // Submeter novo formulário
    cy.get('#submit').click({ force: true });


    // Deletar item e confirma se item foi excluido
    cy.get('#delete-record-4').click();
    cy.get('#delete-record-4').should('not.exist');

})

});
