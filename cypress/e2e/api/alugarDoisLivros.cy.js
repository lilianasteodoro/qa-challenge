describe('Alugar dois livros', () => {
  it('Alugar livros bloco it', () => {

    cy.api({
      method: 'POST',
      url: 'https://demoqa.com/BookStore/v1/Books',
      body: {},
    }).then((res) => {
      //Verificar se o status code e 200 para garatir que os livros foram retornados
        expect(res.status).to.eq(200);
    });
  });
});
