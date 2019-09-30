const jwt = require('jsonwebtoken');

function jwtVerifcation(req, res, next) {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    console.log(req.token);
    if (err) {
      console.log(err);
      console.log('verifcation failed..');
      res.sendStatus(403);
    } else {
      res.json({
        message: 'updated....',
        authData,
      });
    }
  });
  next();
}

module.exports = jwtVerifcation;
