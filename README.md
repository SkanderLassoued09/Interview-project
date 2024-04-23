## API Reference

nodejs 20.9.0
db version v6.0.5 (mongo)

#### Create User

```http
  POST  http://localhost:8080/users/createUser
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `username`  | `string` | **Required**                       |
| `firstName` | `string` | **Required**                       |
| `lastName`  | `string` | **Required**                       |
| `password`  | `string` | **Required&minLength 6 caracters** |

```http
  HINT: You must be logged in to access the Book APIs.
```

#### Login

```http
POST http://localhost:8080/auth/login
Response: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJVU0VSMCIsInVzZXJuYW1lIjoic2thbmRlciIsImlhdCI6MTcxMzkwOTg0Nn0.Hr7la-kEe5wUpKD7da53J-S49kMKoYKRQXe_3Q7GfKA
NB: This token still available :)
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Create Book

```http
  POST  http://localhost:8080/books/createBook
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `title`   | `string` | **Required** |
| `author`  | `string` | **Required** |
| `ISBN`    | `string` | **Optional** |

#### Get all books

```http
  GET http://localhost:8080/books/getBooks

```

#### Get book by its ID

```http
  GET http://localhost:8080/books/bookById/:id
```

#### Delete Book

```http
  Delete http://localhost:8080/books/deleteBook/:id
```

#### Update Book

```http
  Delete http://localhost:8080/books/deleteBook/:id
```
