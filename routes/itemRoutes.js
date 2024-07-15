const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const withAuth = require('../utils/auth');

router.get('/', itemController.getAllItems);
router.post('/', withAuth, itemController.createItem);
router.put('/:id', withAuth, itemController.updateItem);
router.delete('/:id', withAuth, itemController.deleteItem);
router.post('/:id/like', withAuth, itemController.likeItem);
router.get('/favorites', withAuth, itemController.getFavorites);

module.exports = router;
