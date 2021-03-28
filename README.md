# South System

## Instalação e Configuração

- Clone o repositório
- instale o projeto

```
yarn install
```

- Adione um arquivo .env na raiz do projeto e coloque as informações do ambiente conforma o .env.eample

> MongoDB: Se tiver o docker compose instalado rodar o comando abaixo. Mas antes certifique-se que a porta 27107, valor ofnorme arquivo .env (DB_PORT), esteja disponível.
>
> ```
> docker-compose up -d
> ```

- Tenha o MongoDB banco de dados rodando.

- Rode o Projeto

```
yarn dev
```

Inicialmente o sistema irá criar um usuário administrador, credenciais abaixo. Ele terá acesso a todas as rotas

> <p>email: admin@admin.com.br</p>
> <p>senha: admin</p>

---

<br>

# Modelos - Banco de Dados

- Usuario (user)

```js
IUser: {
  _id?: MongoId
  name: string
  age: number
  phone: string
  email: string
  password: string
  bookmarks: MongoId[]
  rentedBooks: MongoId[]
  role: RoleEnum
}
```

- Livro (book)

```js
IBook {
  _id?: MongoId
  title: string
  ibsn: number
  category: string
  year: number
  rented: boolean
}
```

---

# Rotas

- Usuarios

| Método |       Path       | param |        body        |                       Descrição                        | resposta |
| ------ | :--------------: | :---: | :----------------: | :----------------------------------------------------: | :------: |
| get    |    /user/:id     |  id   |         -          |                     Buscar por ID                      |  IUser   |
| delete |    /user/:id     |  id   |         -          |                    Remove o Usuário                    | boolean  |
| get    |      /user/      |   -   |         -          |                Busca todos os Usuários                 | IUser[]  |
| post   |      /user/      |   -   |       IUser        |                    Cadastra Usuário                    |  IUser   |
| put    |    /user/:id     |  id   |       IUser        |                     Altera Usuário                     |  IUser   |
| get    | /rented-list/:id |  id   |         -          |      Busca todos os Livros Alugados pelo Usuário       | IBook[]  |
| get    |  /bookmark/:id   |  id   |         -          | Busca todos os livros na lista de favoritos do Usuário | IBook[]  |
| put    |  /rent-book/:id  |  id   | { bookId: MongoId} |                     Aluga um livro                     |  IUser   |

- Livros

| Método |   Path    | param | body  |        Descrição        | Resposta |
| ------ | :-------: | :---: | :---: | :---------------------: | :------: |
| get    | /book/:id |  id   |   -   |      Buscar por ID      |  IBook   |
| delete | /book/:id |  id   |   -   |     Remove o Livro      | boolean  |
| get    |  /book/   |   -   |   -   | Busca todos os Usuários | IBook[]  |
| post   |  /book/   |   -   | IBook |    Cadastra Usuário     |  IBook   |
| put    | /book/:id |  id   | IBook |     Altera Usuário      |  IBook   |

---

# Permissões

```js
enum RoleEnum {
  READER = 'reader',
  ADMIN = 'admin',
  LIBRARY_OP = 'libraryOp'
}
```
