const accessToken = require('../controllers/loginController');

function verifyToken(req, res, next) {
  const token = accessToken.getToken();
  if (typeof token !== 'undefined') {
    req.token = token;
    next();
  } else { // if we dont have token then we move into else statement
    console.log('in else statement');
    res.redirect('/api/login');
  }
}

module.exports = verifyToken;
