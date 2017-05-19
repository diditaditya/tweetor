const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  password: String,
  avatar: String,
  tweets: [{type: Schema.Types.ObjectId, ref: 'Tweet'}]
});

let User = mongoose.model('User', userSchema);

module.exports = User;
