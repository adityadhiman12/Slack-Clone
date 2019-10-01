const query = require('../database/queryPromisification');

async function queryLogin(input) {
  const finalResult = await query('SELECT password FROM users where email=?', input);
  return finalResult;
}
module.exports = queryLogin;
