const express = require('express');

const router = express.Router();
const channelController = require('../controllers/channelController');

router.use(express.json()); // body parser


// to get all channels
router.get('/', channelController.getChannels);

// to add a new channel
router.post('/', channelController.addChannel);

// to get individual channel
router.get('/:id', channelController.getChannelById);

// to update a channel by id
router.put('/:id', channelController.updateChannel);

// to delete channel by id
router.delete('/:id', channelController.deleteChannelById);

module.exports = router;
