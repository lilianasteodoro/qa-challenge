/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Teste Formulário DemoQA', () => {

  beforeEach(() => {
    // Acessa a página principal e vai para o Practice Form
    cy.visit('https://demoqa.com/');
    cy.contains('Forms').click();
    cy.contains('Practice Form').click();
  });

  it('Preenche e submete o formulário com dados aleatórios', () => {
    // Preenchendo campos com Faker
    cy.get('#firstName').type(faker.person.firstName());
    cy.get('#lastName').type(faker.person.lastName());
    cy.get('#userEmail').type(faker.internet.email());
    
    // Selecionar gênero (apenas exemplo)
    cy.get('input[name="gender"][value="Female"]').check({ force: true });

cy.get('#userNumber').type(Math.floor(1000000000 + Math.random() * 9000000000).toString());

    // Data de nascimento
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('May');
    cy.get('.react-datepicker__year-select').select('1990');
    cy.get('.react-datepicker__day--015').click(); // 15 de Maio de 1990

    // Hobbies

  // Array com todos os hobbies
  const hobbies = ['1', '2', '3']; // 1=Sports, 2=Reading, 3=Music

  // Escolher 1 hobby aleatório
  const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
  // Marcar o hobby selecionado
  cy.get(`#hobbies-checkbox-${hobby}`).check({ force: true });

//Ocoupação
cy.get('#subjectsInput').type('Arts{downarrow}{enter}', { delay: 1000 })
   
 
 // Upload de arquivo
cy.get('#uploadPicture').attachFile('exemplo.txt');


    // Endereço
    cy.get('#currentAddress').type(faker.location.streetAddress());


// Definindo os estados e cidades
// Lista de estados e cidades
const statesCities = {
  "NCR": ["Delhi", "Gurgaon", "Noida"],
  "Uttar Pradesh": ["Agra", "Lucknow", "Merrut"],
  "Haryana": ["Karnal", "Panipat"],
  "Rajasthan": ["Jaipur", "Jaiselmer"]
};

// Escolhe um estado e uma cidade aleatórios
const randomState = Cypress._.sample(Object.keys(statesCities));
const randomCity = Cypress._.sample(statesCities[randomState]);

// Selecionar State
cy.get('#state').click({ force: true });  // clica no container do dropdown
cy.get('#react-select-3-input').type(randomState + '{enter}', { force: true });

// Selecionar City
cy.get('#city').click({ force: true });  // clica no container do dropdown
cy.get('#react-select-4-input').type(randomCity + '{enter}', { force: true });

    // Submeter formulário
    cy.get('#submit').click({ force: true });

    // Verificar popup
    cy.get('#example-modal-sizes-title-lg').should('be.visible');

    // Fechar popup
    cy.get('#closeLargeModal').click();
  });

});
