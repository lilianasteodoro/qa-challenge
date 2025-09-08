describe("Aluguel de um usuário de dois livros API BookStore", () => {
  let createdUserName;
  let createdPassword;
  let createdUserId;
  let generatedToken;

  it("Criar um usuário com sucesso", () => {
    cy.createUser().then(({ response, userName, password, userId }) => {
      expect(response.status).to.eq(201);
      createdUserName = userName;
      createdPassword = password;
      createdUserId = userId;
    });
  });
  it("Tentativa de criar usuário com dados incompletos", () => {
    cy.createInvalidUser().then(({ response }) => {
      expect(response.status).to.be.oneOf([400, 406]);
      expect(response.body).to.have.property("message");
    });
  });

  it("Gerar um token de acesso", () => {
    cy.generateToken(createdUserName, createdPassword).then((token) => {
      expect(token).to.exist;
      generatedToken = token;
    });
  });

  it("Tentativa de gerar token com senha vazia", () => {
    cy.generateInvalidToken(createdUserName, "").then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("message");
    });
  });

  it("Confirmar se o usuário criado está autorizado", () => {
    cy.authorizeUser(createdUserName, createdPassword).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  });

  it("Listar os livros disponíveis", () => {
    cy.listBooks().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body.books).to.be.an("array");
      expect(response.body.books[0]).to.have.all.keys(
        "isbn",
        "title",
        "subTitle",
        "author",
        "publish_date",
        "publisher",
        "pages",
        "description",
        "website"
      );
    });
  });

  it("Alugar dois livros de livre escolha", () => {
    const livrosParaAdicionar = ["9781593275846", "9781593277574"];

    cy.addBooksToUser(createdUserId, generatedToken, livrosParaAdicionar).then(
      (response) => {
        expect(response.status).to.eq(201);
      }
    );
  });

  it("Listar os detalhes do usuário com os livros escolhidos", () => {
    cy.listUserBooks(createdUserId, generatedToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.userId).to.eq(createdUserId);
      expect(response.body.books).to.be.an("array");
      expect(response.body.books.length).to.be.greaterThan(0);
    });
  });
});
