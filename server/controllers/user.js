const User = require('../models/user');
const JWTCheck = require('../helpers/jwtCheck');

let userControl = {
  findAll: function(req, res) {
    User.find({}).populate('tweets').exec((err, users) => {
      if(err) {
        res.send(err);
      } else {
        res.send(users);
      }
    });
  },
  findById: function(req, res) {
    User.findById(req.params.id).populate('tweets').exec((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  },
  update: function(req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        User.update({_id: req.params.id}, {$set:{
          'username': req.body.name || user.username,
          'avatar': req.body.avatar || user.avatar,
          'password': user.password,
          'tweets': req.body.tweets || user.tweets
        }}, (err, updated) => {
          if (err) {
            console.log('goes to error in local user update');
            res.send(err);
          } else {
            console.log('local user is updated');
            res.send(updated);
          }
        });
      }
    });
  },
  register: function(req, res) {
    if(req.status === 'failed') {
      console.log(req.message);
      res.send({status: req.status, message: req.message});
    } else {
      res.send({status: req.status, message: req.message, user: req.user});
    }
  },
  signin: function(req, res) {
    console.log('status: ', req.user.status);
    console.log('message: ', req.user.message);
    if(req.user.status === "failed") {
      res.send({status: req.user.status, message: req.user.message});
    }
    if(req.user.status === "success"){
      res.send(req.user)
    } else {
      res.send('error');
    }
  },
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if(err) {
        res.send(err);
      } else {
        let response = {
          id: req.params.id,
          status: 'success',
          message: 'user is sucessfully deleted'
        };
        res.send(response);
      }
    });
  },
  checkJwt: function(req, res) {
    let token = req.headers['x-access-token'] || req.body.token;
    JWTCheck(token, function(data) {
      if(data) {
        res.send(data);
      } else {
        res.send(err);
      }
    })
  }
}

module.exports = userControl;
