const express = require('express')
require('dotenv').config()
const app = express()
require('express-async-errors')
const cors = require('cors')

const requestLogger = (req, resp, next) => {
  console.log(`${req.method} - ${req.path} - `, req.body)
  next()
}

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('failed to connect to MongoDB', err.message))

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})
