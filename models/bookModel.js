const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  by: String,
  text: String, 
});


const bookSchema = new mongoose.Schema({
  userAdded: {
    type: Boolean,
    default: false,
  },
  title: String,
  subtitle: String,
  isbn13: String,
  price: String,
  image: String,
  url: String,
});

const userAddedSchema = new mongoose.Schema({
  name: String,
  author: String,
  subtitle: String,
  desc: String,
  price: Number,
  publisher: String,
  year: Number,
  pages: Number,
  url: String,
  isbn13: String,
  language: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  books: {
    type: [bookSchema],
    default: [],
  },
  added: {
    type: [userAddedSchema],
    default: [],
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
});

const Main = mongoose.model("Main", userSchema);

module.exports = Main;
