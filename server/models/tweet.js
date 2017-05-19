const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tweetSchema = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: Date,
  tags: [String]
});

let Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
