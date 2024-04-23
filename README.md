# Book API

This API provides endpoints to manage books.

## Endpoints

### Create a Book

- URL: `POST /book/createBook`
- Description: Creates a new book.
- Request Body:

  ````json
  {
    "title": "Atomic habits",
    "author": "James Clear",
    "isbn": "978-3-16-148410-0"
  }

  ```Response

  {
  "id": "BOOK0",
  "title": "Atomic habits",
  "author": "James Clear",
  "isbn": "978-3-16-148410-0",
  "createdAt": "2024-04-23T12:00:00.000Z",
  "updatedAt": "2024-04-23T12:00:00.000Z"
  }
  ````

### Get All Books (Authenticated)

- URL: GET /book/getBooks
- Description: Retrieves all books.
- Authorization: Bearer token required.
- Response:
  [
  {
  "id": "BOOK0",
  "title": "Atomic hanits",
  "author": "James clear",
  "isbn": "978-3-16-148410-0",
  "createdAt": "2024-04-23T12:00:00.000Z",
  "updatedAt": "2024-04-23T12:00:00.000Z"
  },
  {
  "id": "BOOK1",
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "isbn": "978-0-06-112008-4",
  "createdAt": "2024-04-23T12:00:00.000Z",
  "updatedAt": "2024-04-23T12:00:00.000Z"
  }
  ]

  ### Get Book by ID

  - URL: GET /book/bookById/:id
  - Description: Retrieves a book by its ID.
  - Parameters:
  - id: The ID of the book.
  - Response:
    {
    "id": "BOOK0",
    "title": "Atomic hanits",
    "author": "James clear",
    "isbn": "978-3-16-148410-0",
    "createdAt": "2024-04-23T12:00:00.000Z",
    "updatedAt": "2024-04-23T12:00:00.000Z"
    },
