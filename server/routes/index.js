const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const Tweet = require('../controllers/tweet');
const signupHelper = require('../helpers/signup');
const passport = require('../helpers/passport');

router.get('/', (req, res) => {
  res.send('Up and Running');
});

// user routes
router.get('/users', User.findAll);
router.get('/user/:id', User.findById);
router.post('/signup', signupHelper, User.register);
router.post('/signin', passport.authenticate('local-signin', {session: false}), User.signin);
router.put('/user/:id', User.update);
router.delete('/user/:id', User.delete);
router.post('/users/checkJwt', User.checkJwt);

// tweet routes
router.get('/tweets', Tweet.findAll);
router.get('/tweet/:id', Tweet.findById);
router.get('/tweets/searchTags/:tag', Tweet.findByTags);
router.post('/tweets/searchByTags', Tweet.searchByTags);
router.post('/tweets/add', Tweet.create);
router.get('/tweets/popularTags', Tweet.findPopularTags);
router.put('/tweet/:id', Tweet.update);
router.delete('/tweet/:id', Tweet.delete);

module.exports = router;
