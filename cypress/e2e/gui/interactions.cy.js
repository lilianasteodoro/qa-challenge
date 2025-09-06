/// <reference types="cypress" />

describe('Teste Formulário DemoQA', () => {

  beforeEach(() => {
    // Acessa a página principal e vai para o Practice Form
    cy.visit('https://demoqa.com/');
    cy.contains('Interactions').click();
    cy.contains('Sortable').click();
  });

  it("arrasta Two para One", () => {
    cy.get(".list-group-item")
      .contains("Two")
      .trigger("mousedown", { which: 1, force: true });

    cy.get(".list-group-item")
      .contains("One")
      .trigger("mousemove", { force: true })
      .trigger("mouseup", { force: true });
  });

});
