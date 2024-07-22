const sequelize = require('../config/connection');
const { User, Item, Favorite } = require('../models');

const userData = require('./users-seeds.json');
const itemData = require('./items-seeds.json');
const favoriteData = require('./favorites-seeds.json');

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
// const sequelize = require('../config/connection');
// const seedUsers = require('./users-seeds');
// const seedItems = require('./items-seeds');
// const seedFavorites = require('./favorites-seeds');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   console.log('Database synchronized.');

//   await seedUsers();
//   console.log('Users seeded.');

//   await seedItems();
//   console.log('Items seeded.');

//   await seedFavorites();
//   console.log('Favorites seeded.');

//   process.exit(0);
// };

// seedDatabase();

