const { User } = require('../models')

const userData = [
    {
      id: 1,
      user_name: 'John',
      user_password: 'Doe'
    },
    {
      id: 2,
      user_name: 'Jane',
      user_password: 'Doe'
    }
  ];
  
  const seedUsers = () => User.bulkCreate(userData);

  module.exports = seedUsers;
  