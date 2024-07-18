const sequelize = require('./connection');
const Sequelize = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./user')(sequelize, Sequelize);

module.exports = db;
