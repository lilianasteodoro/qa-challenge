// Cypress plugin para API testing
require('cypress-plugin-api')


// Import commands.js using ES2015 syntax:
import "./commands";
import './api_commands';

//esqueci
const app = window.top;
if (!app.document.head.querySelector("data-hide-command-log-request")) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none; }";
  style.setAttribute("data-hide-command-log-request", "");
  app.document.head.appendChild(style);
}

// Retorna false para prevenir falhas do Cypress no teste
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
