# PostBox - Seus Posts/Links Salvos

# PostBox: Agregador Pessoal de Conteúdo

![Badge de Status](https://img.shields.io/badge/status-conclu%C3%ADdo-green)
![Badge de Licença](https://img.shields.io/badge/license-MIT-blue)

PostBox é uma aplicação web Full-Stack desenvolvida para resolver o problema comum de salvar links e posts interessantes para ver "depois" e acabar esquecendo-os. A ferramenta centraliza todo o conteúdo salvo de diversas fontes (redes sociais, blogs, vídeos) em um único lugar, permitindo fácil organização, acesso e gerenciamento.

Este projeto foi construído do zero como um exercício prático, cobrindo todas as etapas de desenvolvimento de uma aplicação web moderna, desde a interface do usuário até a criação de uma API RESTful e integração com banco de dados.

## ✨ Funcionalidades

A aplicação possui um CRUD (Create, Read, Update, Delete) completo para o gerenciamento de posts:

* **Listar Posts:** Visualiza todos os links salvos, com os mais recentes aparecendo primeiro.
* **Adicionar Novo Post:** Permite adicionar um novo link através de um formulário, especificando a URL e uma categoria.
* **Marcar como Lido/Não Lido:** Permite alternar o estado de um post entre "lido" e "não lido", com feedback visual instantâneo.
* **Excluir Post:** Permite remover um post da lista e do banco de dados de forma permanente (após uma confirmação).
* **Feedback ao Usuário:** Notificações de erro e sucesso são exibidas na interface para orientar o usuário.

## 🛠️ Tecnologias Utilizadas

A aplicação é dividida em duas partes principais: Front-end e Back-end.

#### **Front-end (Client-side)**

* **HTML5:** Para a estrutura semântica do conteúdo.
* **CSS3:** Para a estilização e o layout da interface.
* **JavaScript (Vanilla JS):** Para a manipulação do DOM, interatividade e comunicação com a API através da `fetch()`.

#### **Back-end (Server-side)**

* **Node.js:** Ambiente de execução para o JavaScript no servidor.
* **Express.js:** Framework para a construção da API RESTful, gerenciamento de rotas e middlewares.
* **SQLite3:** Banco de dados relacional leve e baseado em arquivo, utilizado para a persistência dos dados.
* **CORS:** Middleware para permitir a comunicação entre o front-end e o back-end em diferentes origens (portas).

## 🚀 Como Rodar o Projeto Localmente

Para executar este projeto na sua máquina, siga os passos abaixo.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/) instalado (que inclui o `npm`).

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://URL-DO-SEU-REPOSITORIO.git](https://URL-DO-SEU-REPOSITORIO.git)
    cd nome-da-pasta-do-projeto
    ```

2.  **Instale as dependências do Back-end:**
    Este comando irá instalar o Express, SQLite, CORS e Nodemon.
    ```bash
    npm install
    ```

3.  **Inicie o Servidor Back-end:**
    Este comando usa o `nodemon` para iniciar o servidor, que reiniciará automaticamente a cada alteração nos arquivos.
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:3000`.

4.  **Abra o Front-end:**
    Não é necessário um servidor para o front-end. Simplesmente abra o arquivo `index.html` no seu navegador de preferência.
    * *Dica: Se você usa o VS Code, a extensão "Live Server" é uma ótima opção para abrir o `index.html`.*

Agora a aplicação deve estar totalmente funcional na sua máquina!

## 📝 Estrutura da API

A API construída segue os padrões REST e oferece os seguintes endpoints:

| Método | Rota               | Descrição                                         |
| :----- | :----------------- | :------------------------------------------------ |
| `GET`    | `/posts`           | Retorna uma lista de todos os posts salvos.         |
| `POST`   | `/posts`           | Adiciona um novo post ao banco de dados.            |
| `PATCH`  | `/posts/:id`       | Atualiza um post existente (ex: marcar como lido). |
| `DELETE` | `/posts/:id`       | Deleta um post específico pelo seu `id`.          |

---