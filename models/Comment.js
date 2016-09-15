module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define('comments', {
        content: DataTypes.TEXT
    }, {
        classMethod: {
            associate: function(models) {
                Comment.belongsTo(models.posts, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Comment;
};