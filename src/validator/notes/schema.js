const Joi = require("joi");

// membuat objek schema
const NotePayloadSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

// ekspor nilai agar dapat digunakan pada berkas JavaScript lain
module.exports = { NotePayloadSchema };
