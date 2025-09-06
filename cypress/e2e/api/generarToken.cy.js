describe('Gerar Token', () => {
  it('Gerar token com os dados básicos', () => {
    const userName = 'testeum';
    const password = 'Teste@123';

    // Esse cy.api exibe os valores pela interface
    cy.api({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/GenerateToken',
      body: { userName, password },
    }).then((res) => {
      // Logs para exibir o dados do cadastro
      cy.log('Body: ' + JSON.stringify(res.body));
      cy.log('Status: ' + res.status);

      // Validar status se foi inserido
      expect([200]).to.include(res.status);


      // video do papito...
    });
  });
});
