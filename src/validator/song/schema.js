const Joi = require('joi');

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  genre: Joi.string().required(),
  albumid :Joi.string()
});

module.exports = { SongPayloadSchema };