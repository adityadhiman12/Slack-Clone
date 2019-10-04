const joi = require('joi');
const bcrypt = require('bcrypt');
const userValidation = require('../validation/register');
const registerQueries = require('../queries/registeration');

function renderPage(req, res) {
  res.render('register');
}

async function register(req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error } = joi.validate(user, userValidation);
  console.log('.....->validation error', error);


  const salt = bcrypt.genSaltSync(10);
  console.log('salt--->', salt);
  const hashedPassword = bcrypt.hashSync(user.password, salt);


  console.log('hashedpwd--->', hashedPassword);
  user.password = hashedPassword;

  if (error !== null) {
    res.status(400);
    res.render('register', { status: 'registeration unsuccessful! Validation is wrong' });
  } else {
    try {
      await registerQueries(Object.values(user));
      res.render('register', { status: 'registeration successful!' });
    } catch (err) {
      res.status(404);
      res.render('register', { status: 'registeration unsuccessful! Wrong user name' });
    }
  }
}

module.exports = {
  renderPage,
  register,
};
