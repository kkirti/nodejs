import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import app from '../app.js'
import Book from '../models/Books.js'

chai.use(chaiHttp)
const { expect } = chai

let server
let bookId
let token

describe('Books API', () => {
  before(async () => {
    server = app.listen(4001)

    await chai.request(app).post('/api/auth/register').send({
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    })

    const res = await chai.request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'password123'
    })
    token = res.body.accessToken
  })

  after(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    server.close()
  })

  beforeEach(async () => {
    await Book.deleteMany({})
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      publishedYear: 2022,
    })
    bookId = book._id.toString()
  })

  it('GET /api/books should return all books', async () => {
    const res = await chai.request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`)
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array').that.has.lengthOf(1)
  })

  it('POST /api/books should create a new book', async () => {
    const res = await chai.request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Book',
        author: 'New Author',
        publishedYear: 2023,
      })
    expect(res).to.have.status(201)
    expect(res.body).to.have.property('title', 'New Book')
  })

  it('GET /api/books/:id should return one book', async () => {
    const res = await chai.request(app)
      .get(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res).to.have.status(200)
    expect(res.body).to.have.property('title', 'Test Book')
  })

  it('PUT /api/books/:id should update the book', async () => {
    const res = await chai.request(app)
      .put(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Title',
        author: 'Updated Author',
        publishedYear: 1956
      })
    expect(res).to.have.status(200)
    expect(res.body).to.have.property('title', 'Updated Title')
  })

  it('DELETE /api/books/:id should delete the book', async () => {
    const res = await chai.request(app)
      .delete(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res).to.have.status(200)
    expect(res.body).to.have.property('message')
  })
})
