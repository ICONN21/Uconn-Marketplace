// const User = require('./user');
// const Item = require('./items');
// const Favorite = require('./favorites');

// // Set up associations
// User.hasMany(Favorite, {
//   foreignKey: 'userId',
// });

// Item.hasMany(Favorite, {
//   foreignKey: 'itemId',
// });

// Favorite.belongsTo(User, {
//   foreignKey: 'userId',
// });

// Favorite.belongsTo(Item, {
//   foreignKey: 'itemId',
// });

// module.exports = { User, Item, Favorite };

const User = require('./user');
const Item = require('./items');
const Favorite = require('./favorites');

// Set up associations with aliases
User.hasMany(Favorite, {
  foreignKey: 'userId',
  as: 'favorites'  // This allows you to use User.getFavorites() in your code
});

Item.hasMany(Favorite, {
  foreignKey: 'itemId',
  as: 'favorites'  // This allows you to use Item.getFavorites()
});

Favorite.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'  // This allows you to use Favorite.getUser()
});

Favorite.belongsTo(Item, {
  foreignKey: 'itemId',
  as: 'item'  // This allows you to use Favorite.getItem()
});

module.exports = { User, Item, Favorite };



