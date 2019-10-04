const express = require('express');

const router = express.Router();
const channelController = require('../controllers/channelController');
const generateToken = require('../middleware/generateToken');
const jwtVerification = require('../middleware/verifyToken');

router.use(express.json());


// to get all channels
router.get('/', channelController.getChannels);

// to add a new channel
router.post('/', generateToken, jwtVerification, channelController.addChannel);

// to get individual channel
router.get(
  '/:id',
  generateToken,
  jwtVerification,
  channelController.getChannelById,
);

// // to update a channel by id
router.put(
  '/:id',
  generateToken,
  jwtVerification,
  channelController.updateChannel,
);

// // to delete channel by id
router.delete(
  '/:id',
  generateToken,
  jwtVerification,
  channelController.deleteChannelById,
);

module.exports = router;
