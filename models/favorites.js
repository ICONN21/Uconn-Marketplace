module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('favorite', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Item',
          key: 'id',
        },
      },
    });
  
    Favorite.associate = models => {
      Favorite.belongsTo(models.User, { foreignKey: 'user_id' });
      Favorite.belongsTo(models.Item, { foreignKey: 'item_id' });
    };
  
    return Favorite;
  };
  