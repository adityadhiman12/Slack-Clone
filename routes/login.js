const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.use(express.json());

router.get('/', loginController.showLoginPage);

router.post('/', loginController.login);

module.exports = router;
