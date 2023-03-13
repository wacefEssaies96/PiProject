const jwt = require('jwt-simple');
const User = require('../models/Users/user');
const { secret } = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const token = jwt.encode({ sub: user.id, iat: timestamp }, secret);
  return token;
}


exports.signin = function (req, res) {

  User.find({email: req.body.email})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with email " + email });
        else {
          var user = data;
          res.send({ token: tokenForUser(req.user), "user" : user });
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with email=" + email });
      });
};

exports.signup = function (req, res, next) {
  var user = new User({
    fullname : req.body.fullname,
    email : req.body.email,
    password : req.body.password,
    role : req.body.role,
    height : req.body.height,
    weight : req.body.weight,
  });
  const email = user.email;
  const password = user.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password must be provided' });
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use...' });
    }


    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
}

  exports.requireRole = function(role) {
    return (req, res, next) => {
      
    var user = null
    User.findOne({ email: req.body.email, role : role})
    .then(data => {
        user = data
        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(403).json({ message: 'Forbidden' });
        }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with email=" + req.body.email+" and role =" + role });
    });

  };

};