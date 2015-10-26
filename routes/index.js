var express = require('express');
var router = express.Router();
// require('../lib/db-calls');
var db = require('monk')('localhost/class-selector');
var students = db.get('students');
var professors = db.get('professors');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'buildingblocks', user: req.session.user });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'buildingblocks', error: "", user: ""});
});

router.post('/signup', function(req, res, next) {
  if (!req.body.accountType || !req.body.name || !req.body.email || !req.body.password) res.render('signup', {title: 'buildingblocks', error: "All fields are required"})
  if (req.body.accountType === "student") {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.body.password = hash;
        students.insert({name: req.body.name, password: req.body.password, email: req.body.email}, 
          function(err, user) {
            req.session.user = user;
            res.redirect('/students');
          })
      })
    })
  }
  if (req.body.accountType === "professor") {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        req.body.password = hash;
        professors.insert({name: req.body.name, password: req.body.password, email: req.body.email}, 
          function(err, user) {
            req.session.user = user;
            res.redirect('/professors');
          })
      })
    })
  }
});

router.get('/signout', function(req, res, next) {
  req.session = null;
  res.redirect("/");
});



module.exports = router;
