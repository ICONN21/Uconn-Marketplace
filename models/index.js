const User = require('./user');
const Item = require('./items');
const Favorite = require('./favorites');

// Set up associations
User.hasMany(Favorite, {
  foreignKey: 'userId',
});

Item.hasMany(Favorite, {
  foreignKey: 'itemId',
});

Favorite.belongsTo(User, {
  foreignKey: 'userId',
});

Favorite.belongsTo(Item, {
  foreignKey: 'itemId',
});

module.exports = { User, Item, Favorite };
