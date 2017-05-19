const db = require('../models');
const JWTCheck = require('../helpers/jwtCheck');

let userControl = {
  findAll: function(req, res) {
    db.User.findAll({include: [Tweet]}).then((users) => {
      res.send(users);
    }).catch((err) => {
      res.send(err);
    });
  },
  findById: function(req, res) {
    db.User.findById(req.params.id, {include: [Tweet]})
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send(err);
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
    if(req.user.status == 'failed') {
      res.send({status: req.user.status, message: req.user.message});
    }
    if(req.user.status === "success"){
      res.send(req.user)
    } else {
      res.send('error');
    }
  },
  delete: function(req, res) {
    db.User.destroy({where: {id: req.params.id}})
      .then((destroyed) => {
        res.send(destroyed);
      })
      .catch((err) => {
        res.send(err);
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
    });
  }
}

module.exports = userControl;
