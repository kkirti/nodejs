import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../app.js';
import Book from '../models/Books.js';

chai.use(chaiHttp);
const { expect } = chai;

let server;
let bookId;

describe('Books API', () => {
  before(async () => {
    server = app.listen(4001);
    await mongoose.connect('mongodb://localhost:27017/Books-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(async () => {
    await Book.deleteMany({});
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      publishedYear: 2022,
    });
    bookId = book._id.toString();
  });

  it('GET /books should return all books', async () => {
    const res = await chai.request(app).get('/books');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array').that.has.lengthOf(1);
  });

  it('POST /books should create a new book', async () => {
    const res = await chai.request(app).post('/books').send({
      title: 'New Book',
      author: 'New Author',
      publishedYear: 2023,
    });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('title', 'New Book');
  });

  it('GET /books/:id should return one book', async () => {
    const res = await chai.request(app).get(`/books/${bookId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('title', 'Test Book');
  });

  it('PUT /books/:id should update the book', async () => {
    const res = await chai.request(app).put(`/books/${bookId}`).send({
      title: 'Updated Title',
      author: 'Updated Author',
      publishedYear: 1956
    });
    console.log(res.body)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('title', 'Updated Title');
  });

  it('DELETE /books/:id should delete the book', async () => {
    const res = await chai.request(app).delete(`/books/${bookId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });
});
