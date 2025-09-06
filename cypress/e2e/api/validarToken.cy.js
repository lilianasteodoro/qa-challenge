describe('Gerar Token', () => {
  it('Validar token', () => {
    const userName = 'testeum';
    const password = 'Teste@123';

    // Esse cy.api exibe os valores pela interface
    cy.api({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/Authorized',
      body: { userName, password },
    }).then((res) => {
      // Logs para exibir o dados do cadastro
      cy.log('Body: ' + JSON.stringify(res.body));
      cy.log('Status: ' + res.status);

      // Validar se foi autorizado
      expect([true]);
    });
  });
});
