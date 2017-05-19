'use strict';
module.exports = function(sequelize, DataTypes) {
  var TweetTag = sequelize.define('TweetTag', {
    tweetId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        TweetTag.belongsTo(models.Tweet, {foreignKey: 'tweetId'});
        TweetTag.belongsTo(models.Tag, {foreignKey: 'tagId'});
      }
    }
  });
  return TweetTag;
};
