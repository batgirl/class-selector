var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/class-selector');
var professors = db.get('professors');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('professors/index', {user: req.session.user});
});

router.get('/login', function(req, res, next) {
  // if (req.session.user) user = req.session.user;
  res.render('login', {user: "", accountType: "professors", loginType: "Professor", error: ""});
});

router.post('/login', function(req, res, next) {
  professors.findOne({email: req.body.email}, function(err, user) {
    if (!user) res.send("oops")
    bcrypt.compare(req.body.password, user.password, function(err, boo) {
      if (boo) {
        req.session.user = user;
        res.redirect("/professors");                
      } else {
        res.send("halp");
      }
    })
  })
})

module.exports = router;