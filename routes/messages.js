const express = require('express');

const router = express.Router();
const mysql = require('mysql');

router.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adi@29071998',
  database: 'chatboxDB',
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('My SQL connected');
  }
});

// to get all messages
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM messages';

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// to add a new msg
router.post('/', (req, res) => {
  const newMsg = req.body.textMsg;
  const channelId = req.body.channel_id;
  const userId = req.body.user_id;
  const newEvent = {

    channel_id: channelId,
    user_id: userId,
    textMsg: newMsg,
  };
  newEvent.id = null;
  // eslint-disable-next-line no-unused-vars
  db.query('INSERT INTO messages SET ?', newEvent, (err, result) => {
    if (err) throw err;
    res.json(newEvent);
  });
});

module.exports = router;
