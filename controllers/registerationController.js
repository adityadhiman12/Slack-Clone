const joi = require('joi');
const bcrypt = require('bcrypt');
const userValidation = require('../validation/register');
const queriesOfRegister = require('../queries/registeration');


async function register(req, res) {
//   console.log(req.body);
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error } = joi.validate(user, userValidation);
  // console.log(error);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;

  if (error !== null) {
    res.status(400);
    res.send('registeration failed');
  } else {
    try {
      await queriesOfRegister(Object.values(user));
      res.send('registeration completed.....');
    } catch (err) {
      res.status(404);
    }
  }
}

module.exports = register;
