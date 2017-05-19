const db = require('../models');
const bcrypt = require('bcrypt');
let saltRounds = 10;

let signupHelper = function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  db.User.findOne({where: {'username': username}})
    .then((user) => {
      if(user) {
        req.status = 'failed';
        req.message = 'username is already taken'
        next();
      } else {
        bcrypt.hash(password, saltRounds, function(err, hashed) {
          if(err) {
            return next(err);
          } else {
            db.User.create({
              username: username,
              password: hashed
            })
              .then((data) => {
                req.status = 'success';
                req.user = data;
                next();
              })
              .catch((err) => {
                return next(err);
              });
          }
        });
      }
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = signupHelper;
