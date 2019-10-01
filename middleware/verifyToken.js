const jwt = require('jsonwebtoken');
const createError = require('http-errors');


function jwtVerification(req, res, next) {
  try {
    jwt.verify(req.token, 'revealed');
    next();
  } catch (err) {
    console.log(err);
    next(createError(403, 'not authorised to access'));
  }
}


module.exports = jwtVerification;
