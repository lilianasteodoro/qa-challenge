const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    env: {
      hideCredentials: true, // Para proteger o acessToken
      requestMode: true, // Para feedbaks dos testes com o uso do request
    },
  },
  video: false,
});
