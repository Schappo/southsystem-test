import Joi from 'joi'

const createBookSchema = Joi.object({
  title: Joi.string().max(100).required(),
  ibsn: Joi.number().required(),
  category: Joi.string().max(100).required(),
  year: Joi.number().max(9999).required(),
  rented: Joi.boolean()
})

const updateBookSchema = Joi.object({
  title: Joi.string().max(100),
  ibsn: Joi.number(),
  category: Joi.string().max(100),
  year: Joi.number().max(9999),
  rented: Joi.boolean()
})

export default {
  createBookSchema,
  updateBookSchema
}
