const express = require('express');


const registerationController = require('../controllers/registerationController');

const router = express.Router();
router.use(express.json());

router.post('/', registerationController);

module.exports = router;
