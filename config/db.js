const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Books')
        console.log('DB connected')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB

// sudo systemctl start mongod