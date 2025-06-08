# Node.js Book API

## Overview

This project is a Node.js REST API for managing books, users, authentication, and file uploads.  
It uses Express, MongoDB (via Mongoose), and JWT for authentication.

---

## Endpoints

### Auth

- **POST /api/auth/register**  
  Register a new user.  
  **Body:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "role": "user" // or "admin"
  }
  ```
  **Response:**  
  - 201 Created: `{ "message": "User registered successfully" }`

- **POST /api/auth/login**  
  Login and receive a JWT token.  
  **Body:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
  **Response:**  
  - 200 OK: `{ "accessToken": "JWT_TOKEN" }`

---

### Books

- **GET /api/books**  
  Get all books.  
  **Headers:** `Authorization: Bearer <token>`  
  **Response:**  
  - 200 OK: Array of books

- **POST /api/books**  
  Create a new book.  
  **Headers:** `Authorization: Bearer <token>`  
  **Body:**  
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "publishedYear": 2024
  }
  ```
  **Response:**  
  - 201 Created: Book object

- **GET /api/books/:id**  
  Get a book by ID.  
  **Headers:** `Authorization: Bearer <token>`  
  **Response:**  
  - 200 OK: Book object

- **PUT /api/books/:id**  
  Update a book by ID.  
  **Headers:** `Authorization: Bearer <token>`  
  **Body:**  
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "publishedYear": 2025
  }
  ```
  **Response:**  
  - 200 OK: Updated book object

- **DELETE /api/books/:id**  
  Delete a book by ID.  
  **Headers:** `Authorization: Bearer <token>`  
  **Response:**  
  - 200 OK: `{ "message": "Book deleted" }`

---

### Files (Uploads)

- **POST /api/files/upload**  
  Upload a file for a book.  
  **Headers:**  
  - `Authorization: Bearer <token>`  
  - `Content-Type: multipart/form-data`  
  **Body:**  
  - `file`: File to upload  
  - `bookId`: ID of the book  
  **Response:**  
  - 201 Created: `{ "message": "File uploaded", "file": { ... } }`

- **GET /api/files/:bookId**  
  Get all files for a book.  
  **Headers:** `Authorization: Bearer <token>`  
  **Response:**  
  - 200 OK: Array of file objects

- **GET /uploads/:filename**  
  Download or view an uploaded file by filename.

---

## Environment Variables

- `MONGO_URI` - MongoDB connection string for production
- `MONGO_URI_TEST` - MongoDB connection string for tests
- `PORT` - Server port
- `JWT_SECRET` - JWT secret for access tokens
- `JWT_REFRESH_SECRET` - JWT secret for refresh tokens

---

## Running Tests

```bash
npm test
```

---

## Notes

- All protected endpoints require a valid JWT in the `Authorization` header.
- Only admins can create, update, or delete books (if role-based access is enforced).
- File uploads are stored in the `/uploads` directory.