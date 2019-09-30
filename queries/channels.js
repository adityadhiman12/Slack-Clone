const query = require('../database/queryPromisification');


async function queryGetChannels() {
  const queryResult = await query('SELECT * FROM channels');
  return queryResult;
}

async function queryAddChannel(inputs) {
  const queryResult = await query('INSERT INTO channels(id,name) VALUES(?,?) ', inputs);
  return queryResult;
}

async function queryGetSingleChannel(input) {
  const queryResult = await query('SELECT * FROM channels where id=?', input);
  return queryResult;
}

async function queryUpdateChannel(inputs) {
  const queryResult = await query(
    'UPDATE channels SET name=? WHERE id = ? ',
    inputs,
  );
  return queryResult;
}

async function queryDeleteChannel(input) {
  const queryResult = await query(
    'DELETE from channels where id= ?',
    input,
  );
  return queryResult;
}


module.exports = {
  queryGetChannels, queryGetSingleChannel, queryAddChannel, queryUpdateChannel, queryDeleteChannel,
};
