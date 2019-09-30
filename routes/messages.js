const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController');
const generateToken = require('../middleware/generateToken');
const jwtVerification = require('../middleware/jwtVerification');

router.use(express.json()); // body parser


// to get all channels
router.get('/', messageController.getMessages);

// to add a new channel
router.post('/', generateToken, jwtVerification, messageController.addMessage);

// to get individual channel
router.get('/:id', messageController.getMessageById);

// to update a channel by id
router.put('/:id', generateToken, jwtVerification, messageController.updateMessage);

// to delete channel by id
router.delete('/:id', generateToken, jwtVerification, messageController.deleteMessageById);

module.exports = router;
