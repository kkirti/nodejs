import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number
});

const Book = mongoose.model('Books', bookSchema);
export default Book;

//sudo systemctl start mongod