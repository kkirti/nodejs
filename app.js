const express = require('express')
const connectDB = require('./config/db')
const testRoute = require('./routes/TestRoute')
const bookRoutes = require('./routes/BookRoute')

const app = express()
connectDB()
app.use(express.json())

// app.use('/', testRoute)
app.use('/', bookRoutes)

app.listen(3000,()=>{
  console.log('server is running....')
})

module.exports = app