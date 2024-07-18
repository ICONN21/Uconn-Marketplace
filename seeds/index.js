const sequelize = require('../config/connection');
const Item = require('../models/Item');
const itemData = require('./item-seeds.sql');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Item.bulkCreate(itemData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
