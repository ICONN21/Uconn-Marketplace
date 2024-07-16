const Sequelize = require('sequelize');
const sequelize = require('../config/connections');

const User = require('./user');
const Item = require('./item');
const Favorite = require('./favorite');

const db = {
  User: User(sequelize, Sequelize.DataTypes),
  Item: Item(sequelize, Sequelize.DataTypes),
  Favorite: Favorite(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
