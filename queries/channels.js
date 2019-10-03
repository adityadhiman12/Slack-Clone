const query = require('../database/queryPromisification');


async function getChannels() {
  const queryResult = await query('SELECT * FROM channels');
  return queryResult;
}

async function addChannel(inputs) {
  const queryResult = await query('INSERT INTO channels(id,name) VALUES(?,?) ', inputs);
  return queryResult;
}

async function getSingleChannel(input) {
  const queryResult = await query('SELECT * FROM channels where id=?', input);
  return queryResult;
}

async function updateChannel(inputs) {
  const queryResult = await query(
    'UPDATE channels SET name=? WHERE id = ? ',
    inputs,
  );
  return queryResult;
}

async function deleteChannel(input) {
  const queryResult = await query(
    'DELETE from channels where id= ?',
    input,
  );
  return queryResult;
}


module.exports = {
  getChannels, getSingleChannel, addChannel, updateChannel, deleteChannel,
};
