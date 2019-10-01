const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  res.send('in login');
});

router.post('/', loginController.login);

module.exports = router;
