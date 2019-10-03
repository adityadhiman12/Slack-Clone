const query = require('../database/queryPromisification');

async function login(input) {
  const finalResult = await query('SELECT password FROM users where email=?', input);
  return finalResult;
}
module.exports = login;
