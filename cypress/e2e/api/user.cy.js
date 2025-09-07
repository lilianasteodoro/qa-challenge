describe('Fluxo completo de API BookStore', () => {
  let createdUserName;
  let createdPassword;
  let createdUserId;
  let generatedToken;

  it('Criar um usuário', () => {
    cy.createUser().then(({ response, userName, password, userId }) => {
      expect(response.status).to.eq(201);
      createdUserName = userName;
      createdPassword = password;
      createdUserId = userId;
    });
  });

  it('Gerar um token de acesso', () => {
    cy.generateToken(createdUserName, createdPassword).then((token) => {
      expect(token).to.exist;
      generatedToken = token;
    });
  });

  it('Confirmar se o usuário criado está autorizado', () => {
    cy.authorizeUser(createdUserName, createdPassword).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  });

  it('Listar os livros disponíveis', () => {
    cy.listBooks().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.books).to.be.an('array');
    });
  });

  it('Alugar dois livros de livre escolha', () => {
    const livrosParaAdicionar = ['9781593275846', '9781593277574'];

    cy.addBooksToUser(createdUserId, generatedToken, livrosParaAdicionar).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('Listar os detalhes do usuário com os livros escolhidos', () => {
    cy.listUserBooks(createdUserId, generatedToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.userId).to.eq(createdUserId);
      expect(response.body.books).to.be.an('array');
      expect(response.body.books.length).to.be.greaterThan(0);
    });
  });
});
