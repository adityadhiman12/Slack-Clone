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

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM channels';

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
