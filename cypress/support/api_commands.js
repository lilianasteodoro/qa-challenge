/*const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `https://demoqa.com`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  cy.request({
    method: 'GET',
    url: '/api/v4/projects/',
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_deleteProjects', () => {
  cy.api_getAllProjects().then(res =>
    res.body.forEach(project => cy.request({
      method: 'DELETE',
      url: `/api/v4/projects/${project.id}`,
      headers: { Authorization: accessToken },
    }))
  )
})
cy.createUser({
  id: 123,
  name: 'Jane Lane',
})
*/
// Comando customizado para criar usuário
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
});


/*
Criar um usuário (https://demoqa.com/Account/v1/User)
Gerar um token de acesso (https://demoqa.com/Account/v1/GenerateToken)
Confirmar se o usuário criado está autorizado (https://demoqa.com/Account/v1/Authorized)
Listar os livros disponíveis (https://demoqa.com/BookStore/v1/Books)
Alugar dois livros de livre escolha (https://demoqa.com/BookStore/v1/Books)
Listar os detalhes do usuário com os livros escolhidos (https://demoqa.com/Account/v1/User/{userID})

*/