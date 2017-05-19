const db = require('../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
let saltRounds = 10;
const jwt = require('jsonwebtoken');

passport.use('local-signin', new LocalStrategy(
  function(username, password, done) {
    db.User.findOne({where: {'username': username}})
      .then((user) => {
        if(!user) {
          return done(null, {status: 'failed', message: 'Username is not found'});
        } else if(user) {
          bcrypt.compare(password, user.password, function(err, res) {
            console.log('res: ', res);
            if(err) {
              return done(err, {status: 'failed', message: 'Error in decoding the password-hash'});
            }
            if(res === true) {
              let userInfo = {
                id: user.id,
                username: user.username
              };
              let token = jwt.sign(userInfo, process.env.JWT_SECRET);
              let message = 'Sucessfully signed in';
              return done(null, {status: 'success', message: message, user: userInfo, token: token});
            } else {
              return done(null, {status: 'failed', message: 'Password is incorrect'});
            }
          })
        }
      })
      .catch((err) => {
        console.log('in findOne error');
        return done(err);
      });
    }
  )
);




module.exports = passport;
