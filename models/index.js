const User = require('./user')
const Item = require('./items');
const Favorite = require('./favorites');
const Sequelize = require('sequelize');

User.hasMany(Item, {
  foreignKey: 'user_id', // Specifies the field in Item that will act as the foreign key
  as: 'items'            // This creates an alias for User.getItems() and User.setItems()
});

// Items belong to a User
Item.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'owner'            // This creates an alias for Item.getOwner() and Item.setOwner()
});

// User has many Favorites
User.hasMany(Favorite, {
  foreignKey: 'user_id',
  as: 'favorites'         // This creates an alias for User.getFavorites() and User.setFavorites()
});

// Favorites belong to a User
Favorite.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'              // This creates an alias for Favorite.getUser() and Favorite.setUser()
});

// Item has many Favorites
Item.hasMany(Favorite, {
  foreignKey: 'item_id',
  as: 'favorites'         // This creates an alias for Item.getFavorites() and Item.setFavorites()
});

// Favorites belong to an Item
Favorite.belongsTo(Item, {
  foreignKey: 'item_id',
  as: 'item'              // This creates an alias for Favorite.getItem() and Favorite.setItem()
});

module.exports = { User, Item, Favorite}
