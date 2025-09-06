
/*Cypress.Commands.add('api_createUser', (userName, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/User',
    body: { userName, password }
  })
    Cypress.Commands.add('createUser', (user) => {
  return cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/User',
    body: {
      userName: user.userName,
      password: user.password,
    },
    failOnStatusCode: false // evita quebrar caso usuário já exista
  }).then((resp) => {
    cy.log('Status: ' + resp.status);
    cy.log('Body: ' + JSON.stringify(resp.body));

    // Salva userID como alias se foi criado
    if (resp.status === 201) {
      cy.wrap(resp.body.userID).as('userId');
    }

    return resp;
  });
})
*/
import { faker } from '@faker-js/faker';
describe('Cadastro de usuário na API BookStore', () => {
  it('Cria usuário', () => {
    const userName = faker.person.firstName() + faker.string.numeric(4)
    const password = 'Senha@123';

    // 1. Criar usuário
    // Esse cy.api exibe os valores pela interface
    cy.api({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: { userName, password },
      failOnStatusCode: false // não quebra se usuário já existir
    }).then((res) => {
      // Logs para exibir o dados do cadastro
      cy.log('Body: ' + JSON.stringify(res.body));
      cy.log('Status: ' + res.status);

      // Validar status se foi inserido
      expect([201]).to.include(res.status);


      // video do papito...
    });
  });
});

