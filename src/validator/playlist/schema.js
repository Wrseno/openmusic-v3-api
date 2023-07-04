const Joi = require("joi");

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const SongPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().max(50).required(),
});

module.exports = {PlaylistPayloadSchema, SongPlaylistPayloadSchema};
