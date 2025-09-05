/// <reference types="cypress" />

describe("Teste Formulário DemoQA", () => {
  beforeEach(() => {
    // Acessa a página principal e vai para o Practice Form
    cy.visit("https://demoqa.com/");
    cy.contains("Widgets").click();
    cy.contains("Progress Bar").click();
  });

  it("Clica no start da barra de progresso até ou igual 25% ", () => {
    
    //Começando travando o scroll da página para visualizar melhor os testes

    // Clicando no botão
    cy.wait(4000)
    cy.get("#startStopButton").click();
    // Para antes dos 25%
    cy.wait(1000);
    cy.get("#startStopButton").click();

    cy.wait(5000)
    // Valida que a largura da barra é <= 25%
    cy.get(".progress-bar")
      .invoke("css", "width")
      .then((width) => {
        // O Cypress retorna em pixels, então precisamos converter para %
        cy.get(".progress-bar")
          .invoke("text")
          .then((text) => {
            const percent = parseInt(text.replace("%", ""));
            expect(percent).to.be.lte(25);
          });
      });
    cy.wait(1000);
    // Clica Start novamente e espera os 100%
    cy.get("#startStopButton").click();
    cy.get(".progress-bar", { timeout: 20000 }).should("contain.text", "100%");
   cy.wait(2000)
    // Reset
    cy.get("#resetButton").click();
    cy.get(".progress-bar").should("contain.text", "0%");

  });
});
