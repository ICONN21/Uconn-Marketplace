const sequelize = require('../config/connection');
const seedUsers = require('./users-seeds');
const seedItems = require('./items-seeds');
const seedFavorites = require('./favorites-seeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  console.log('Database synchronized.');

  await seedUsers();
  console.log('Users seeded.');

  await seedItems();
  console.log('Items seeded.');

  await seedFavorites();
  console.log('Favorites seeded.');

  process.exit(0);
};

seedDatabase();
