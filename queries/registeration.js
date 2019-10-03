const query = require('../database/queryPromisification');

async function insertUser(inputs) {
  const finalResult = await query('INSERT INTO users(email,password) VALUES (?,?)', inputs);
  return finalResult;
}
module.exports = insertUser;
