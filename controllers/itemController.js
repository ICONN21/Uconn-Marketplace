const { Item, User, Favorite } = require('../models');

module.exports = {
  getAllItems: async (req, res) => {
    try {
      const itemData = await Item.findAll({
        include: [
          {
            model: User,
            attributes: ['email'],
          },
        ],
      });

      const items = itemData.map((item) => item.get({ plain: true }));
      res.render('posts', { 
        items,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createItem: async (req, res) => {
    try {
      const newItem = await Item.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newItem);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  updateItem: async (req, res) => {
    try {
      const updatedItem = await Item.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (!updatedItem[0]) {
        res.status(404).json({ message: 'No item found with this id!' });
        return;
      }

      res.status(200).json(updatedItem);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteItem: async (req, res) => {
    try {
      const itemData = await Item.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!itemData) {
        res.status(404).json({ message: 'No item found with this id!' });
        return;
      }

      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  likeItem: async (req, res) => {
    try {
      const newFavorite = await Favorite.create({
        user_id: req.session.user_id,
        item_id: req.params.id,
      });

      res.status(200).json(newFavorite);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getFavorites: async (req, res) => {
    try {
      const favoriteData = await Favorite.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [
          {
            model: Item,
            include: [
              {
                model: User,
                attributes: ['email'],
              },
            ],
          },
        ],
      });

      const favorites = favoriteData.map((favorite) => favorite.get({ plain: true }));
      res.render('favorites', { 
        favorites,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
