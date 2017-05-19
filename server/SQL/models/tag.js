'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    tag: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tag.belongsToMany(models.Tweet, {through: 'TweetTag', foreignKey: 'tagId'});
      }
    }
  });
  return Tag;
};
