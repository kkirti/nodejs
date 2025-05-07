const Books = require('../models/Books')

class BookController {
    
    async create(req,res) {
        try {
            const book = new Books(req.body)
            const saved = await book.save()
            res.status(201).json(saved)
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }

    async getAll(req, res) {
        try {
          const books = await Books.find();
          res.json(books);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }

      async getOne(req, res) {
        try {
          const book = await Books.findById(req.params.id);
          if (!book) return res.status(404).json({ error: 'Book not found' });
          res.json(book);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    
      async update(req, res) {
        try {
          const book = await Books.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          if (!book) return res.status(404).json({ error: 'Book not found' });
          res.json(book);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      }
    
      async delete(req, res) {
        try {
          const book = await Books.findByIdAndDelete(req.params.id);
          if (!book) return res.status(404).json({ error: 'Book not found' });
          res.json({ message: 'Book deleted' });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
}

module.exports = new BookController();