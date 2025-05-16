import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/BookController.js';
import { validateBook } from '../middlewares/bookValidation.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, createBook);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

export default router;