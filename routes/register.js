const express = require('express');


const registerationController = require('../controllers/registerationController');

const router = express.Router();
router.use(express.json());

router.get('/', registerationController.renderPage);

router.post('/', registerationController.register);

module.exports = router;
