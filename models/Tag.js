module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('tags', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsToMany(models.posts, { through: 'post_tags' });
      }
    }
  });

  return Tag;
};