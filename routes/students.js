var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/class-selector');
var students = db.get('students');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('students/index', {user: req.session.user});
});

router.get('/login', function(req, res, next) {
  res.render('login', {user: "", accountType: "students", loginType: "Student", error: ""});
});

router.post('/login', function(req, res, next) {
  students.findOne({email: req.body.email}, function(err, user) {
    bcrypt.compare(req.body.password, user.password, function(err, boo) {
      if (boo) {
        req.session.user = user;
        res.redirect("/students");                
      } else {
        res.send("halp");
      }
    })
  })
})

module.exports = router;
