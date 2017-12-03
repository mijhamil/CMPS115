// Represents a document to be retrived
const mongoose = require('mongoose');
const config = require('../config/database');
const bodyParser = require('body-parser');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  },
  locationstyle: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  payrate: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Post = module.exports = mongoose.model('Post', postSchema);
