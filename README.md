# API DE CADASTRO DE FILMES

O projeto foi desenvolvido para o desafio do estágio 08 do explorer da Rocketseat.

As tecnologias envolvidas são:

* JavaScript

* NodeJS

* Express

* Knex

* SQLite

* ESLint


## Funcionalidades

- Cadastro de usuários
- Atualização de usuários
- Cadastro de filmes (nome, descrição, avaliação)
- Tags relacionadas aos filmes cadastrados
- Busca de filmes e tags
- Exclusão de filmes


## Instalação

Para que você consiga rodar o projeto, deverá ter o Node instalado na máquina.

Primeiramente, você deve clonar o projeto do GitHub:

```bash
git clone https://github.com/Yurig19/desafio-explorer-movieApi.git
```

Após isso, será necessário entrar na pasta do projeto e instalar as dependências do projeto, realizando os seguintes comandos:

```bash
cd desafio-explorer-movieApi
npm install
```

Na sequência, você realizará as migrações do banco de dados da aplicação. O banco utilizado foi o SQLite. Caso queira, você poderá abrir o arquivo do banco em algum gerenciador de banco de dados de sua preferência. Para realizar as migrações, deverá rodar o seguinte script no terminal:

```bash
npm run migrate
```

Por fim, rode o projeto:

```bash
npm run dev
```

Para realizar as operações você pode usar algum Api client, como o postman, insomnia, etc..

## Licença

O projeto está sob liceça 
[MIT](https://choosealicense.com/licenses/mit/).

