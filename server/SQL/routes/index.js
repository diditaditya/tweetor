const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
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
router.delete('/user/:id', User.delete);

module.exports = router;
