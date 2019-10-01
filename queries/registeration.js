const query = require('../database/queryPromisification');

async function queryInsertUser(inputs) {
  const finalResult = await query('INSERT INTO users(email,password) VALUES (?,?)', inputs);
  return finalResult;
}
module.exports = queryInsertUser;
