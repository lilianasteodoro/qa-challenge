## Visão Geral

Primeira parte do desafio técnico com foco em automação de API. Foram implementados testes automatizados para a API **BookStore** utilizando **JavaScript** com **Cypress**:

- Cypress 
- Faker.js para geração de dados dinâmicos
- Custom Commands para reutilização de funcionalidades

Foram implementados cenários de teste para:

- Criação de usuários (válidos e inválido)  
- Geração de tokens de acesso (válidos e inválido)  
- Listagem de livros disponíveis  
- Aluguel de livros para usuários  
- Validação de detalhes do usuário e livros alugados

### Executando os testes

1. Instale as dependências:

```bash
npm install

Para executar em modo headless utilize o comando:

npx cypress run

Ou para abrir a interface visual do Cypress utilize:

npx cypress open

