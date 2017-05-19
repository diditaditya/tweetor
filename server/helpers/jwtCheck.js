const User = require('../models/user');
const jwt = require('jsonwebtoken');

let jwtCheck = function(token, callback) {
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if(err) {
      callback(err);
    } else {
      callback(decoded);
    }
  });
}

module.exports = jwtCheck;
