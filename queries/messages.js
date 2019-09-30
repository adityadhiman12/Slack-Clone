const query = require('../database/queryPromisification');


async function queryGetMessages() {
  const queryResult = await query('SELECT * FROM messages');
  return queryResult;
}

async function queryAddMessage(inputs) {
  const queryResult = await query('INSERT INTO messages(id,channel_id,user_id,textMsg) VALUES(?,?,?,?) ', inputs);
  return queryResult;
}

async function queryGetSingleMessage(input) {
  const queryResult = await query('SELECT * FROM messages where id=?', input);
  return queryResult;
}

async function queryUpdateMessage(inputs) {
  const queryResult = await query(
    'UPDATE messages SET textMsg=? WHERE id = ? ',
    inputs,
  );
  return queryResult;
}

async function queryDeleteMessage(input) {
  const queryResult = await query(
    'DELETE from messages where id= ?',
    input,
  );
  return queryResult;
}


module.exports = {
  queryGetMessages, queryGetSingleMessage, queryAddMessage, queryUpdateMessage, queryDeleteMessage,
};
