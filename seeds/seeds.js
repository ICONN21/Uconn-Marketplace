const sequelize = require('../config/connection');
const { User, Item, Favorite } = require('../models');

const userData = require('./users-seeds');
const itemData = require('./items-seeds');
const favoriteData = require('./favorites-seeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const items = await Item.bulkCreate(itemData, {
    individualHooks: true,
    returning: true,
  });

  for (const favorite of favoriteData) {
    await Favorite.create({
      ...favorite,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      item_id: items[Math.floor(Math.random() * items.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();


