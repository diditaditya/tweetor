'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define('Tweet', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tweet.belongsTo(models.User, {foreignKey: 'userId'});
        Tweet.belongsToMany(models.Tag, {through: 'TweetTag', foreignKey: 'tweetId'});
      }
    }
  });
  return Tweet;
};
