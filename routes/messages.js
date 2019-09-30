const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController');

router.use(express.json()); // body parser

// to get all channels
router.get('/', messageController.getMessages);

// to add a new channel
router.post('/', messageController.addMessage);

// to get individual channel
router.get('/:id', messageController.getMessageById);

// to update a channel by id
router.put('/:id', messageController.updateMessage);

// to delete channel by id
router.delete('/:id', messageController.deleteMessageById);

module.exports = router;
