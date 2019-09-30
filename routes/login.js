const express = require('express');

const router = express.Router();
const loginController = require('../controllers/loginController');

router.use(express.json()); // body parser

router.post('/', loginController);

module.exports = router;
