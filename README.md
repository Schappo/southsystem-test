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

# Permissões

```js
enum RoleEnum {
  READER = 'reader',
  ADMIN = 'admin',
  LIBRARY_OP = 'libraryOp'
}
```

---

# Rotas

- Usuarios

<p>Usuários com role READER só podem alterar dados de sua própria conta (authReaderMiddlware).</p>
<p>Usuários com role Admin tem permissão total dentro do sistema</p>

| Método |       Path       | param |        body        |             Descrição             | resposta |              Permissões              |
| ------ | :--------------: | :---: | :----------------: | :-------------------------------: | :------: | :----------------------------------: |
| get    |    /user/:id     |  id   |         -          |           Buscar por ID           |  IUser   |         RoleEnum.LIBRARY_OP          |
| delete |    /user/:id     |  id   |         -          |         Remove o Usuário          | boolean  | RoleEnum.LIBRARY_OP, RoleEnum.READER |
| get    |      /user/      |   -   |         -          |      Busca todos os Usuários      | IUser[]  |         RoleEnum.LIBRARY_OP          |
| post   |      /user/      |   -   |       IUser        |         Cadastra Usuário          |  IUser   | RoleEnum.LIBRARY_OP, RoleEnum.READER |
| put    |    /user/:id     |  id   |       IUser        |          Altera Usuário           |  IUser   | RoleEnum.LIBRARY_OP, RoleEnum.READER |
| get    | /rented-list/:id |  id   |         -          |   Busca Livros Alugados Usuário   | IBook[]  | RoleEnum.LIBRARY_OP, RoleEnum.READER |
| get    |  /bookmark/:id   |  id   |         -          | Busca livros favoritos do Usuário | IBook[]  | RoleEnum.LIBRARY_OP, RoleEnum.READER |
| put    |  /rent-book/:id  |  id   | { bookId: MongoId} |            Aluga livro            |  IUser   |         RoleEnum.LIBRARY_OP          |
| put    | /return-book/:id |  id   | { bookId: MongoId} |           Devolve livro           |  IUser   |         RoleEnum.LIBRARY_OP          |

- Livros

| Método |   Path    | param | body  |        Descrição        | Resposta |              Permissões              |
| ------ | :-------: | :---: | :---: | :---------------------: | :------: | :----------------------------------: |
| get    | /book/:id |  id   |   -   |      Buscar por ID      |  IBook   | RoleEnum.LIBRARY_OP, RoleEnum.READER |
| delete | /book/:id |  id   |   -   |     Remove o Livro      | boolean  |         RoleEnum.LIBRARY_OP          |
| get    |  /book/   |   -   |   -   | Busca todos os Usuários | IBook[]  | RoleEnum.LIBRARY_OP, RoleEnum.READER |
| post   |  /book/   |   -   | IBook |    Cadastra Usuário     |  IBook   |         RoleEnum.LIBRARY_OP          |
| put    | /book/:id |  id   | IBook |     Altera Usuário      |  IBook   |         RoleEnum.LIBRARY_OP          |

- Populate

| Método |     Path     | param | body |          Descrição          | Resposta |   Permissões   |
| ------ | :----------: | :---: | :--: | :-------------------------: | :------: | :------------: |
| get    | /populate-db |   -   |  -   | Popula dados iniciais no BD |    -     | RoleEnum.ADMIN |

Caso já exista algum item deste salvo no banco de dados o seed não é realizado

- seed

```js
const createBook1: IBook = {
  category: "romance",
  rented: false,
  ibsn: 1928212121211,
  title: "Populate Book 1",
  year: 2008,
};

const createBook2: IBook = {
  category: "ficção cientifica",
  rented: false,
  ibsn: 1928212121212,
  title: "Populate Book 2",
  year: 2008,
};

const createUser1: IUser = {
  age: 27,
  bookmarks: [],
  email: "reader-user@soouthsystem.com",
  name: "Populate User 1",
  role: RoleEnum.READER,
  password: "reader",
  phone: "0909090909",
  rentedBooks: [],
};

const createUser2: IUser = {
  age: 27,
  bookmarks: [],
  email: "library-op-user@southsystem.com",
  name: "Populate User 1",o
  role: RoleEnum.LIBRARY_OP,
  password: "libraryop",
  phone: "0909090909",
  rentedBooks: [],
};
```
