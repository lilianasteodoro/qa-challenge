// Import commands.js using ES2015 syntax:
import "./commands";
import './api_commands';

// Cypress plugin para API testing
require('cypress-plugin-api')

// Retorna false para prevenir falhas do Cypress no teste
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
