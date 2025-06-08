import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bookRoutes from './routes/BookRoute.js'
import authRoutes from './routes/AuthRoute.js'
import uploadRoutes from './routes/UploadRoutes.js'
import Book from './models/Books.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/uploads', express.static('uploads'))
app.use('/api/files', uploadRoutes)

// Use a different Mongo URI for test environment
const mongoUri =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/Books-test'
    : process.env.MONGO_URI

mongoose.connect(mongoUri).then(() => console.log('Mongo connected'))

await Book.syncIndexes()

export default app