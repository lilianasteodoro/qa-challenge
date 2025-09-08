import { faker } from '@faker-js/faker';

// Criar um usuário
Cypress.Commands.add('createUser', () => {
  const userName = faker.person.firstName() + faker.string.numeric(4);
  const password = 'Teste@123';

  return cy.request({
    method: 'POST',
    url: '/Account/v1/User',
    body: { userName, password },
    failOnStatusCode: false
  }).then((response) => {
    return {
      response,
      userName,
      password,
      userId: response.body.userID
    };
  });
});

// Criar um usuário inválido 
Cypress.Commands.add("createInvalidUser", () => {
  const userName = faker.person.firstName(); // sem senha

  return cy.request({
    method: "POST",
    url: "/Account/v1/User",
    body: { userName },
    failOnStatusCode: false,
  }).then((response) => {
    return {
      response,
      userName,
    };
  });
});


// Gerar um token de acesso
Cypress.Commands.add('generateToken', (userName, password) => {
  return cy.request({
    method: 'POST',
    url: '/Account/v1/GenerateToken',
    body: { userName, password }
  }).then((response) => {
    return response.body.token;
  });
});

// Tentativa de gerar um token de acesso para um usuario sem senha
Cypress.Commands.add("generateInvalidToken", (userName) => {
  return cy.request({
    method: "POST",
    url: "/Account/v1/GenerateToken",
    body: { userName },
    failOnStatusCode: false, 
  });
});


// Confirmar se o usuário criado está autorizado
Cypress.Commands.add('authorizeUser', (userName, password) => {
  return cy.request({
    method: 'POST',
    url: '/Account/v1/Authorized',
    body: { userName, password }
  });
});

// Listar os livros disponíveis
Cypress.Commands.add('listBooks', () => {
  return cy.request({
    method: 'GET',
    url: '/BookStore/v1/Books'
  });
});

// Alugar dois livros de livre escolha
Cypress.Commands.add('addBooksToUser', (userId, token, isbns) => {
  return cy.request({
    method: 'POST',
    url: '/BookStore/v1/Books',
    headers: { Authorization: `Bearer ${token}` },
    body: {
      userId,
      collectionOfIsbns: isbns.map((isbn) => ({ isbn }))
    }
  });
});

// Listar os detalhes do usuário com os livros escolhidos
Cypress.Commands.add('listUserBooks', (userId, token) => {
  return cy.request({
    method: 'GET',
    url: `/Account/v1/User/${userId}`,
    headers: { Authorization: `Bearer ${token}` }
  });
});
