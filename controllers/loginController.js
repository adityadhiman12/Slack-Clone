const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');
const loginValidator = require('../validation/login');
const queryOfLogin = require('../queries/login');

let Token;

async function login(req, res) {
  console.log('------------------->');
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error } = joi.validate(user, loginValidator);

  if (error !== null) {
    res.status(404).send('login failed...validation issue is there');
  } else {
    try {
      const finalResult = await queryOfLogin(user.email);
      if (finalResult.length === 0) {
        res.status(404).send('username not found');
      } else {
        bcrypt.compare(
          user.password,
          finalResult[0].password,
          (err, bothEqual) => {
            if (bothEqual === true) {
              const authentifiedUser = {
                email: user.email,
              };
              const token = jwt.sign({ authentifiedUser }, 'revealed', {
                expiresIn: '30m',
              });
              Token = token;

              console.log(token);
              // res.send(token);
              res.redirect('http://localhost:7000/api/channels');
            } else {
              res.status(404).send('invalid pwd');
            }
          },
        );
      }
    } catch (err) {
      console.log(err, 'incorrect email');
      res.status(404);
    }
  }
}

function getToken() {
  return Token;
}
module.exports = { login, getToken };
