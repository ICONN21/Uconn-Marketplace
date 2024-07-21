const { Favorite } = require('../models')

const favoriteData = [
    {
      id: 1,
      image: '#',
      title: '3/4th violin',
      description: 'old violin 3/4ths sized but in good condition'
    },
    {
      id: 2,
      image: '#',
      title: 'Gaming Laptop',
      description: 'Lazer gaming laptop 64gb ram'
    }
  ];

  const seedFavorite = () => Favorite.bulkCreate(favoriteData);
  
  module.exports = seedFavorite;
  
