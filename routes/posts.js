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
    locationstyle: req.body.locationstyle,
    date: req.body.date,
    time: req.body.time,
    payrate: req.body.payrate,
    details: req.body.details,
    createdBy: req.body.createdBy
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
      res.json({success: false, message: err});
    } else {
      if(!posts) {
        res.json({success: false, message: 'No job posts found.'});
      } else {
        res.json({success: true, posts: posts})
      }
    }
  }).sort({'_id': -1});
});

// Retrieves post with specified ID
router.get('/singlePost/:id', (req, res) => {
  if(!req.params.id) {
    res.json({success: false, message: 'No post ID supplied.'});
  } else {
    Post.findOne({_id: req.params.id}, (err, post) => {
      if(err) {
        res.json({success: false, message: err});
      } else {
        if(!post) {
          res.json({success: false, message: 'No post with supplied ID found.'});
        } else {
          res.json({success: true, post: post});
        }
      }
    });
  }
});

// Deletes post with specified ID
router.delete('/deletePost/:username/:id', (req, res) => {
  if(!req.params.id) {
    res.json({success: false, message: 'No post ID supplied.'});
  } else {
    Post.findOne({_id: req.params.id}, (err, post) => {
      if(err) {
        res.json({success: false, message: err});
      } else {
        if(!post) {
          res.json({success: false, message: 'No post with supplied ID found.'});
        } else {
          if(req.params.username !== post.createdBy) {
            res.json({success: false, message: 'Unauthorized to delete this post.'});
          } else {
            post.remove((err) => {
              if(err) {
                res.json({success: false, message: err});
              } else {
                res.json({success: true, message: 'Post deleted.'});
              }
            });
          }
        }
      }
    });
  }
});

// Updates post with matching id
router.put('/updatePost', (req, res) => {
  if(!req.body._id) {
    res.json({succes: false, message: 'No post ID supplied'});
  } else {
      Post.findOne({_id: req.body._id}, (err, post) => {
        if(err) {
          res.json({success: false, message: err});
        } else {
          if(!post) {
            res.json({success: false, message: 'No post with supplied ID found.'})
          } else{
            post.title = req.body.title;
            post.location = req.body.location;
            post.locationstyle = req.body.locationstyle;
            post.date = req.body.date;
            post.time = req.body.time;
            post.payrate = req.body.payrate;
            post.details = req.body.details;
            post.save((err) => {
              if(err) {
                if(err.errors) {
                  res.json({success: false, message: 'Something went wrong.'})
                } else {
                  res.json({success: false, message: err});
                }
              } else {
                res.json({success: true, message: 'Post updated.'});
              }
            });
          }
        }
      })
  }
});

module.exports = router;
