const mongoose = require('mongoose');
const config = require('../config/database');
const bodyParser = require('body-parser');

const settingsSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  payrate: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: false
  }
});

const Settings = module.exports = mongoose.model('Settings', settingsSchema);