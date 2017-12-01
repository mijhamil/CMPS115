const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Check if username already exists
router.get('/checkUsername/:username', (req, res) => {
  const username = req.params.username;

  User.getUserByUsername(username, (err, user) => {
    if(err) {
      return res.json({ success: false, message: err });
    } else {
      if(!user) {
        return res.json({ success: true, message: 'Username is available'});
      } else {
        return res.json({ success: false, message: 'Username already exists'});
      }
    }
  });
});

// Settings
router.put('/settings', (req, res, next) => {
  // let user = new User({
  //   name: req.body.name,
  //   username: req.body.username,
  //   password: req.body.password,
  //   bio: req.body.bio,
  //   imgLink: req.body.imgLink
  //   //skills: req.body.skills,
  //   //image: req.body.image
  // });

  // User.findOne({id: req.params._id}, (err,user) => {
  //   if(err){
  //     res.json({success: false, msg:String(err)});
  //   } else {
  //     user.name = req.params.name;
  //     //user.bio = req.params.bio;
  //     user.imgLink = req.params.imgLink;
  //     // user.password = req.params.password;
  //     user.save((err,user) => {
  //       if(err){
  //         res.json({success: false, msg: err});
  //       }
  //       else{
  //         res.json({success: true, msg: JSON.stringify(req.params)});
  //         //res.json({success: true, msg:JSON.stringify(user)});          
  //       }
  //     });
  //   }
  // });
  User.findOneAndUpdate({id: req.params._id}, req.body, (err,user) => {
    if(err){
      res.json({success: false, msg:String(err)});
    } else {
      res.json({success: true, msg:JSON.stringify(user)});
    }
  });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({payload:user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Single User Profile
//possibly add "passport.authenticate('jwt', {session:false})," after "router.get('/profile', "
router.get('/profile/:_id', (req, res, next) => {
  const _id = req.params._id;

  User.getUserById(_id, (err, user) => {
    if(err) {
      return res.json({ success: false, message: err });
    } else {
      if(!user) {
        return res.json({ success: false, message: 'User not found.'});
      } else {
        return res.json({ success: true, user: user});
      }
    }
  });
});

// All User Profiles
//possibly add "passport.authenticate('jwt', {session:false})," after "router.get('/profile', "
router.get('/profile', (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) {
      res.json({ success: false, message: err });
    } else {
      if(!users) {
        res.json({ success: false, message: 'No users found'});
      } else {
        res.json({ success: true, users: users});
      }
    }
  })
});


module.exports = router;
