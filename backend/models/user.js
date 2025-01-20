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
      author_name: String,
      number_of_pages_median: Number,
      first_publish_year: Number,
      key: String,
    },
  ],
})

const User = mongoose.model('User', schema)

module.exports = User
