import Book from '../models/Books.js';

export const getAllBooks = async (req, res) => {
  try{
  const books = await Book.find();
  res.json(books);
  } catch (err){
    console.log(err)
  }
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json(book);
};

export const createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json({
    title:book.title,
    author: book.author,
    publishedYear: book.publishedYear
  });
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};

export const searchBooks = async (req, res) => {
  try {
    const results = await Book.find({ $text: { $search: req.query.query } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};