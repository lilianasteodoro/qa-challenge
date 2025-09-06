describe('Fluxo completo da API Book Store', () => {
  const userName = 'usuarioTeste_' + Date.now();
  const password = 'Senha@123';

  let userId;
  let token;

  it('Cria usuário, gera token, autoriza, lista livros, adiciona e valida', () => {
    // 1. Criar usuário
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: { userName, password }
    }).then(res => {
      expect(res.status).to.eq(201);
      userId = res.body.userID;

      // 2. Gerar token
      cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/GenerateToken',
        body: { userName, password }
      }).then(res => {
        expect(res.status).to.eq(200);
        expect(res.body.status).to.eq('Success');
        token = res.body.token;

        // 3. Confirmar se autorizado
        cy.request({
          method: 'POST',
          url: 'https://demoqa.com/Account/v1/Authorized',
          body: { userName, password }
        }).then(res => {
          expect(res.status).to.eq(200);
          expect(res.body).to.eq(true);

          // 4. Listar livros disponíveis
          cy.request({
            method: 'GET',
            url: 'https://demoqa.com/BookStore/v1/Books'
          }).then(res => {
            expect(res.status).to.eq(200);
            expect(res.body.books.length).to.be.greaterThan(1);

            const doisIsbns = [
              res.body.books[0].isbn,
              res.body.books[1].isbn
            ];

            // 5. Adicionar dois livros ao usuário
            cy.request({
              method: 'POST',
              url: 'https://demoqa.com/BookStore/v1/Books',
              headers: { Authorization: `Bearer ${token}` },
              body: {
                userId,
                collectionOfIsbns: doisIsbns.map(isbn => ({ isbn }))
              }
            }).then(res => {
              expect(res.status).to.eq(201);

              // 6. Buscar detalhes do usuário
              cy.request({
                method: 'GET',
                url: `https://demoqa.com/Account/v1/User/${userId}`,
                headers: { Authorization: `Bearer ${token}` }
              }).then(res => {
                expect(res.status).to.eq(200);
                expect(res.body.username).to.eq(userName);
                expect(res.body.books).to.have.length(2);
              });
            });
          });
        });
      });
    });
  });
});
