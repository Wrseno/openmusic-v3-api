const Joi = require("joi");
const currentYear = new Date().getFullYear();

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().min(1900).max(currentYear).integer().required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().integer(),
  albumId: Joi.string(),
});

module.exports = {SongPayloadSchema};
