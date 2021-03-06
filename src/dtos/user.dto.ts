import Joi from 'joi'

const createUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  age: Joi.number().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  bookmarks: Joi.array().items(Joi.string()),
  rentedBooks: Joi.array().items(Joi.string())

})

const updateUserSchema = Joi.object({
  name: Joi.string().max(100),
  age: Joi.number(),
  phone: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  bookmarks: Joi.array().items(Joi.string()),
  rentedBooks: Joi.array().items(Joi.string())
})

export default {
  createUserSchema,
  updateUserSchema
}
