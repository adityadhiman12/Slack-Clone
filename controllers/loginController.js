const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');
const loginValidator = require('../validation/login');
const loginQueries = require('../queries/login');

let Token;

function showLoginPage(req, res) {
  res.render('login');
}

async function login(req, res) {
  console.log('------------------->');
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error } = joi.validate(user, loginValidator);

  if (error !== null) {
    res.render('login', { status: 'login unsuccessful....check your validation' });
    res.status(404);
  } else {
    try {
      const finalResult = await loginQueries(user.email);
      if (finalResult.length === 0) {
        res.render('login', { status: 'username not found' });
        res.status(404);
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
              res.redirect('/api/channels');
            } else {
              res.render('login', { status: 'Wrong password' });
              res.status(404);
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
module.exports = { showLoginPage, login, getToken };
