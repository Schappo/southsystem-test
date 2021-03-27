import * as Joi from 'joi'
import { IDatabaseConfig } from '../shared/interfaces'
import mongoose from 'mongoose'

const {
  DB_PORT,
  DB_NAME
} = process.env

const DB_URI = `mongodb://localhost:${DB_PORT}/${DB_NAME}?authSource=admin`

export const schema: Joi.ObjectSchema = Joi.object().keys({
  uri: Joi.string().required(),
  options: Joi.object({
    useNewUrlParser: Joi.boolean().required(),
    useCreateIndex: Joi.boolean().required(),
    useUnifiedTopology: Joi.boolean().required(),
    useFindAndModify: Joi.boolean()
  })
})

export const config: IDatabaseConfig = {
  uri: DB_URI,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
}
const { error, value: validatedDBConfig }: Joi.ValidationResult = schema.validate(config)

if (error) {
  throw new Error(`Invalid Config Database! message: ${error.message}`)
}

mongoose.connect(validatedDBConfig.uri, validatedDBConfig.options)

export const connectDB = (): void => {
  mongoose.connect(validatedDBConfig.uri, validatedDBConfig.options)
}
