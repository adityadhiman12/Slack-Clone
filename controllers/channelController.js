const joi = require('joi');
const createError = require('http-errors');

const channelsValidator = require('../validation/channels');

const queriesOfChannels = require('../queries/channels');

// get all channels   // renderin part left
async function getChannels(req, res, next) {
  try {
    const finalResult = await queriesOfChannels.queryGetChannels();
    if (req.headers['content-type'] === 'application/json') {
      res.send(finalResult);
    }
  } catch (err) {
    next(err);
  }
}

// add channel //rendering part left
async function addChannel(req, res, next) {
  const newChannel = {
    id: req.body.id,
    name: req.body.name,
  };

  const { error } = joi.validate(newChannel, channelsValidator);
  if (error === null) {
    try {
      const result = await queriesOfChannels.queryAddChannel(
        Object.values(newChannel),
      );
      if (result.affectedRows != 0) {
        res.send(newChannel);
      } else {
        next(createError(404, 'failed inserting... '));
      }
    } catch (err) {
      next(err);
    }
  } else {
    console.log(error);
    next(createError(400, 'input values are wrong....'));
  }
}

// get individual channel //rendering part left
async function getChannelById(req, res, next) {
  try {
    const result = await queriesOfChannels.queryGetSingleChannel(req.params.id);
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
async function updateChannel(req, res, next) {
  const newUpdatedChannel = {
    name: req.body.name,
  };
  const { error } = joi.validate(newUpdatedChannel, channelsValidator);

  const updatedChannelValues = Object.values(newUpdatedChannel);
  console.log(updatedChannelValues);
  updatedChannelValues.push(req.params.id);
  console.log(updatedChannelValues);

  if (error === null) {
    try {
      const finalResult = await queriesOfChannels.queryUpdateChannel(updatedChannelValues);
      if (finalResult.affectedRows != 0) {
        res.send(newUpdatedChannel);
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
async function deleteChannelById(req, res, next) {
  try {
    const finalResult = await queriesOfChannels.queryDeleteChannel(req.params.id);
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
  getChannels,
  addChannel,
  getChannelById,
  updateChannel,
  deleteChannelById,
};
