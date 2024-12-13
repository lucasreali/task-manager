# Task Manager

Este é um projeto de gerenciamento de tarefas que permite aos usuários autenticar-se, criar, editar e excluir tarefas. A aplicação foi construída para fornecer uma maneira simples e eficiente de organizar tarefas do dia a dia, com foco em uma interface intuitiva e fácil de usar.

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

-   **Next.js**: Framework React para renderização do lado do servidor e rotas automáticas.
-   **React**: Biblioteca para construção de interfaces dinâmicas.
-   **TypeScript**: Superset do JavaScript que adiciona tipagem estática para maior segurança e manutenção do código.
-   **Auth.js**: Biblioteca para autenticação, gerenciamento de sessões e segurança.
-   **Prisma**: ORM que facilita a interação com o banco de dados, simplificando operações de leitura e escrita.

## Funcionalidades

Este sistema oferece as seguintes funcionalidades:
-   **Autenticação**: Validação de usuários usando o Auth.js, garantindo uma experiência segura e personalizada.
-   **Gerenciamento de Tarefas**: Capacidade de criar, editar e remover tarefas de forma simples e rápida.

## Instalação

Para configurar o projeto localmente, siga os passos abaixo:

### 1. Clonar o Repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/lucasreali/task-manager
```

### 2. Instalar Dependências

Navegue até a pasta do projeto e instale as dependências utilizando o gerenciador de pacotes de sua preferência:

```bash
# Usando npm
npm install

# Usando pnpm
pnpm install

# Usando yarn
yarn install
```

### 3. Gerar a Chave de Autenticação

Execute o seguinte comando para gerar a chave de autenticação necessária para o funcionamento do Auth.js:

```bash
npx auth secret
```

### 4. Configurar Variáveis de Ambiente

Renomeie o arquivo .env-exemple para .env e adicione a URL de conexão do seu banco de dados na variável DATABASE_URL.

### 5. Rodar o Projeto

Agora, após a configuração, inicie o projeto com o comando correspondente ao seu gerenciador de pacotes:

```bash
# Usando npm
npm run dev

# Usando pnpm
pnpm dev

# Usando yarn
yarn dev
```

## Pré-requisitos
Certifique-se de ter o seguinte instalado:

- Node.js (versão 20 ou superior)
- Banco de dados configurado (como PostgreSQL ou MySQL, dependendo da sua configuração no Prisma)
OBS: SQLite não funcionara pois não possui a opção de ENUM