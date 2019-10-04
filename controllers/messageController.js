const joi = require('joi');
const createError = require('http-errors');

const messagesValidator = require('../validation/messages');

const messageQueries = require('../queries/messages');

// get all messages   // renderin part left
async function getMessages(req, res, next) {
  try {
    const finalResult = await messageQueries.getMessages();
    res.json(finalResult);
  } catch (err) {
    next(err);
  }
}

// add channel //rendering part left
async function addMessage(req, res, next) {
  const newMessage = {
    id: req.body.id,
    channel_id: req.body.channel_id,
    user_id: req.body.user_id,
    textMsg: req.body.textMsg,
  };

  const { error } = joi.validate(newMessage, messagesValidator);
  console.log(error);
  if (error === null) {
    try {
      const result = await messageQueries.addMessage(
        Object.values(newMessage),
      );
      if (result.affectedRows != 0) {
        res.send(newMessage);
      } else {
        next(createError(404, 'failed inserting... '));
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(createError(400, 'input values are wrong....'));
  }
}

// get individual channel //rendering part left
async function getMessageById(req, res, next) {
  try {
    const result = await messageQueries.getSingleMessage(req.params.id);
    if (result.length === 0) {
      next(createError(404, 'no such id exists'));
    } else {
      res.send(result);
    }
  } catch (err) {
    next(err);
  }
}

// update channel by id
async function updateMessage(req, res, next) {
  const newUpdatedMessage = {
    textMsg: req.body.textMsg,

  };
  const { error } = joi.validate(newUpdatedMessage, messagesValidator);

  const updatedMessageValues = Object.values(newUpdatedMessage);

  updatedMessageValues.push(req.params.id);
  console.log(error);

  if (error === null) {
    try {
      const finalResult = await messageQueries.updateMessage(updatedMessageValues);
      if (finalResult.affectedRows != 0) {
        res.send(newUpdatedMessage);
      } else {
        next(createError(404, 'failure in updation'));
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(createError(400, 'input values are wrong'));
  }
}

// delete channel by id
async function deleteMessageById(req, res, next) {
  try {
    const finalResult = await messageQueries.deleteMessage(req.params.id);
    if (finalResult.affectedRows != 0) {
      res.send('Deletion successful...');
    } else {
      res.status(404).send('Deletion couldnt be done');
    }
  } catch (err) {
    next(err);
  }
}


module.exports = {
  getMessages,
  addMessage,
  getMessageById,
  updateMessage,
  deleteMessageById,
};
