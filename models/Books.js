import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number
});
bookSchema.index({ title: 'text' })
const Book = mongoose.model('Books', bookSchema);
export default Book;

//sudo systemctl start mongod