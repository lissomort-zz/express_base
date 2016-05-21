var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var usersMiddleware = require('../middlewares/users');
var app = require('../app')

/* Renders registeration template */
router.get('/register', usersMiddleware.isNotAuthenticated, function(req, res) {
  res.render('register');
});

/* Handles registeration */
router.post('/register', usersMiddleware.isNotAuthenticated, function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render("register", {message: "Sorry. That username already exists. Try again."});
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

/* Renders login templte */
router.get('/login', usersMiddleware.isNotAuthenticated, function(req, res) {
  res.render('login');
});

/* Handles login */
router.post('/login', usersMiddleware.isNotAuthenticated, function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('login', {message: "Wrong username/password pair."});
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      else{
        if ( req.body.rememberme ) {
          req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
        } else {
          req.session.cookie.expires = false;
        }
      }
      return res.redirect('/');
    });

  })(req, res, next);
});

/* Handles logout */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
