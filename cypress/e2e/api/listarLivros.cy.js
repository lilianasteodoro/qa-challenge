describe('Exibir livros do usuário', () => {
  it('Listar livros do usuário ', () => {

    cy.api({
      method: 'GET',
      url: 'https://demoqa.com/Account/v1/User/{userID})',
      body: {},
    }).then((res) => {
      //Verificar se o status code e 200 para garatir que os livros foram retornados
        expect(res.status).to.eq(200);
    });
  });
});
