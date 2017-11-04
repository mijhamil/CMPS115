// Represents a document to be retrived
const mongoose = require('mongoose');
const config = require('../config/database');
const bodyParser = require('body-parser');

// const regexDate = /^(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])\D(\d{2})$/;


const postSchema = mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  payrate: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: true
  }
});

const Post = module.exports = mongoose.model('Post', postSchema);
