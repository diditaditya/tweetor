const Tweet = require('../models/tweet');
const User = require('../models/user');
const Fire = require('../helpers/firebase');

let tweetControl = {
  findAll: function(req, res) {
    Tweet.find({}).populate('user').exec((err, tweets) => {
      if(err) {
        res.send(err);
      } else {
        res.send(tweets);
      }
    });
  },
  findById: function(req, res) {
    Tweet.findOne({_id: req.params.id}).populate('user').exec((err, tweet) => {
      if (err) {
        res.send(err);
      } else {
        res.send(tweet);
      }
    });
  },
  findByTags: function(req, res) {
    Tweet.find({tags: req.params.tag}).populate('user').exec((err, tweets) => {
      if(err) {
        res.send(err);
      } else {
        res.send(tweets);
      }
    });
  },
  searchByTags: function(req, res) {
    Tweet.find({tags: req.body.tags}).populate('user').exec((err, tweets) => {
      if(err) {
        res.send(err);
      } else {
        res.send(tweets);
      }
    });
  },
  findPopularTags: function(req, res) {
    let tags = {};
    Tweet.find({}).populate('user').exec((err, tweets) => {
      if(err) {
        res.send(err);
      } else {
        tweets.map((tweet) => {
          tweet.tags.map((tag) => {
            if(tags.hasOwnProperty(tag)) {
              tags[tag] += 1;
            } else {
              tags[tag] = 1;
            }
          });
        });
        let sortable = [];
        for (var tag in tags) {
          sortable.push([tag, tags[tag]]);
        }
        sortable.sort((a,b) => {
          return b[1] - a[1];
        });
        let sorted = sortable.map((tag) => {
          return tag[0];
        });
        res.send(sorted);
      }
    });
  },
  create: function(req, res) {
    console.log('in tweet control create');
    let tweet = new Tweet({
      content: req.body.content,
      user: req.body.user,
      createdAt: new Date(),
      tags: req.body.tags
    });
    console.log('tweet: ', tweet);
    tweet.save((err) => {
      if(err) {
        res.send(err);
      } else {
        console.log('in new tweet save');
        User.findById(req.body.user, (err, user) => {
          if (err) {
            res.send(err);
          } else {
            console.log('user: ', user);
            let tweets = user.tweets;
            tweets.push(tweet._id);
            User.update({_id: req.body.userId}, {$set:{
              'username': user.username,
              'avatar': user.avatar,
              'password': user.password,
              'tweets': tweets
            }}, (err, updated) => {
              if (err) {
                console.log('goes to error in local user update');
                res.send(err);
              } else {
                console.log('just before running the firebase');
                let flag = {
                  action: "add",
                  tweetId: tweet.id
                }
                Fire.writeTweetData(flag);
                let response = {
                  tweet: tweet,
                  status: 'success',
                  message: 'tweet is sucessfully created'
                };
                console.log(response);
                res.send(response);
              }
            });
          }
        });
      }
    });
  },
  update: function(req, res) {
    Tweet.findById(req.params.id, (err, tweet) => {
      if (err) {
        res.send(err);
      } else {
        Tweet.update({_id: req.params.id}, {$set:{
          'content': req.body.content || tweet.content,
          'user': tweet.user,
          'createdAt': tweet.createdAt,
          'tags': req.body.tags || tweet.tags
        }}, (err, updated) => {
          if (err) {
            console.log('goes to error in tweet update');
            res.send(err);
          } else {
            console.log('local tweet is updated');
            res.send(updated);
          }
        });
      }
    });
  },
  delete: function(req, res) {
    let user = req.body.user;
    Tweet.findByIdAndRemove(req.params.id, (err, tweet) => {
      if(err) {
        res.send(err);
      } else {

        User.findById(req.body.user, (err, user) => {
          if (err) {
            res.send(err);
          } else {

            if(user !== null) {
              let tweets = user.tweets;
              let index = tweets.indexOf(req.params.id);
              tweets.splice(index, 1);
              User.update({_id: req.body.user}, {$set:{
                'username': user.username,
                'avatar': user.avatar,
                'password': user.password,
                'tweets': tweets
              }}, (err, updated) => {
                if (err) {
                  console.log('goes to error in local user update');
                  res.send(err);
                } else {
                  let flag = {
                    action: "delete",
                    tweetId: tweet.id
                  }
                  Fire.writeTweetData(flag);
                  let response = {
                    id: req.params.id,
                    status: 'success',
                    message: 'tweet is sucessfully deleted'
                  };
                  res.send(response);
                }
              });
            } else {
              let response = {
                id: req.params.id,
                status: 'success',
                message: 'tweet is deleted, but not found in any user'
              };
              res.send(response);
            }

          }
        });

      }
    });
  }
}

module.exports = tweetControl;
