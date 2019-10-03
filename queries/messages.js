const query = require('../database/queryPromisification');


async function getMessages() {
  const queryResult = await query('SELECT * FROM messages');
  return queryResult;
}

async function addMessage(inputs) {
  const queryResult = await query('INSERT INTO messages(id,channel_id,user_id,textMsg) VALUES(?,?,?,?) ', inputs);
  return queryResult;
}

async function getSingleMessage(input) {
  const queryResult = await query('SELECT * FROM messages where id=?', input);
  return queryResult;
}

async function updateMessage(inputs) {
  const queryResult = await query(
    'UPDATE messages SET textMsg=? WHERE id = ? ',
    inputs,
  );
  return queryResult;
}

async function deleteMessage(input) {
  const queryResult = await query(
    'DELETE from messages where id= ?',
    input,
  );
  return queryResult;
}


module.exports = {
  getMessages, getSingleMessage, addMessage, updateMessage, deleteMessage,
};
