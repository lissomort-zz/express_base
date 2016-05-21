var express = require('express');
var router = express.Router();

/* GET renders home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* GET to serve welcome message */
router.get('/welcome', function(req, res) {
  res.render('welcome', { title: 'Hello, MEAN app!', app_name: 'MEAN' });
});

module.exports = router;
