const express = require('express')
const BookController = require('../controllers/BookController')
const validate = require('../middlewares/validate')
const { createBookSchema, updateBookSchema } = require('../validations/bookValidation')

class BookRoute {
  constructor() {
    this.router = express.Router()
    this.registerRoutes()
  }

  registerRoutes() {
    this.router.post('/books', validate(createBookSchema), BookController.create)
    this.router.get('/books', BookController.getAll)
    this.router.get('/books/:id', BookController.getOne)
    this.router.put('/books/:id', validate(updateBookSchema), BookController.update)
    this.router.delete('/books/:id', BookController.delete)
  }

  getRouter() {
    return this.router
  }
}

module.exports = new BookRoute().getRouter()