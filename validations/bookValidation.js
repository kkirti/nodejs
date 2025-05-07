const Joi = require('joi');

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().optional(),
  publishedYear: Joi.number().integer().min(0).optional(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  publishedYear: Joi.number().integer().min(0).optional(),
}).min(1); // Require at least one field

module.exports = {
  createBookSchema,
  updateBookSchema,
};