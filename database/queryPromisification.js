const db = require('./connection');

function queryPromisification(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
}

module.exports = queryPromisification;
