import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
} from '../controllers/BookController.js';
import { validateBook } from '../middlewares/bookValidation.js';
import { authenticate } from '../middlewares/auth.js';
import { allowRoles } from '../middlewares/role.js';

const router = express.Router();

router.get('/search', searchBooks);
router.get('/', authenticate, allowRoles('admin', 'user'), getAllBooks);
router.get('/:id', authenticate, allowRoles('admin', 'user'), getBookById);
router.post('/', authenticate, allowRoles('admin'), validateBook, createBook);
router.put('/:id', authenticate, allowRoles('admin'), validateBook, updateBook);
router.delete('/:id', authenticate, allowRoles('admin'), deleteBook);

export default router;