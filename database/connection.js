const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DATABASE_host,
  user: process.env.DATABASE_user,
  password: process.env.DATABASE_password,
  database: process.env.DATABASE_datbase,
});


module.exports = db;
