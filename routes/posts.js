const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Posts a new post to te database
router.post('/newPost', (req, res) => {
  const post = new Post({
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
    payrate: req.body.payrate,
    details: req.body.details
  });
  post.save((err)=> {
    if (err) {
      if(err.errors) {
        if(err.errors.title) {
          res.json({success: false, message: err.errors.title.message});
        } else {
          if(err.errors.body) {
            res.json({success: false, message: err.errors.body.message});
          } else {
            res.json({suuccess: false, message: err});
          }
        }
      } else {
        res.json({success: false, message: err});
      }
    } else{
      res.json({success: true, message: 'Post saved!'});
    }
  });
});

// Retrieves all posts in the database
router.get('/allPosts', (req, res) => {
  Post.find({}, (err, posts) => {
    if(err) {
      res.json({ success: false, message: err });
    } else {
      if(!posts) {
        res.json({ success: false, message: 'No job posts found.'});
      } else {
        res.json({success: true, posts: posts})
      }
    }
  }).sort({'_id': -1});
});

module.exports = router;
