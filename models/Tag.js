module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('tags', {
        title: DataTypes.STRING
    }, {
        classMethod: {
            associate: function(models) {
                Tag.belongsToMany(models.post, {
                    through: 'post_tags',
                });
            }
        }
    });

    return Tag;
};