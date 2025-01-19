const mongoose = require('mongoose')

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  backgroundColor: {
    type: String,
  },
  books: [
    {
      title: String,
      author: String,
    },
  ],
})

const User = mongoose.model('User', schema)

module.exports = User
