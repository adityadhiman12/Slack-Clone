
const jwt = require('jsonwebtoken');

async function login(req, res, next) {
  try {
    const user = {
      id: 1,
      userName: 'Aditya',
      email: 'aditya.dhiman@mountblue.io',
    };
    jwt.sign({ user }, 'secretKey', (err, token) => {
      res.json({ token });
    });
  } catch (err) {
    next(err);
  }
}


module.exports = login;
