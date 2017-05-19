const db = require('../models');

let tweetControl = {
  findAll: function(req, res) {
    db.Tweet.findAll({include: [Tag]}).then((tweets) => {
      res.send(tweets);
    }).catch((err) => {
      res.send(err);
    });
  },
  findById: function(req, res) {
    db.Tweet.findById(req.params.id, {include: [Tag]})
      .then((tweet) => {
        res.send(tweet);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  create: function(req, res) {
    if(req.body.content) {
      db.Tweet.create({
        content: req.body.content,
        userId: req.body.userId
      })
        .then((data) => {

        })
        .catch((err) => {
          
        });
    }
  }
}

module.exports = tweetControl;
