var express = require('express');
var router = express.Router();
var queries = require('../db');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors) {
    res.render('register',{
      errors: errors,
      name: name,
      username: username,
      email: email
    });
  } else {
    var newUser = {
      name: name,
      username: username,
      email: email,
      password: password
    }
    queries.insertUser(newUser);
    req.flash('success_msg', 'You are now registered and can login');
    res.redirect('/users/login');
  }
});

// router.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   }),
//   function(req, res) {
//     res.redirect('/');
//   })

module.exports = router;
