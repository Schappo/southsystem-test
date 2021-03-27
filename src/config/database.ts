import * as Joi from 'joi'
import { IDatabaseConfig } from '../shared/interfaces'
import mongoose from 'mongoose'

const {
  DB_PORT,
  DB_NAME
} = process.env

const DB_URI = `mongodb://localhost:${DB_PORT}/${DB_NAME}?authSource=admin`

export const schema: Joi.ObjectSchema = Joi.object().keys({
  dbUri: Joi.string().required(),
  options: Joi.object({
    useNewUrlParser: Joi.boolean().required(),
    useCreateIndex: Joi.boolean().required(),
    useUnifiedTopology: Joi.boolean().required(),
    useFindAndModify: Joi.boolean()
  })
})

export const config: IDatabaseConfig = {
  dbUri: DB_URI,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
}

export const connectDB = async (dbHostname: string, dbPort: string, dbName: string): Promise<typeof mongoose> => {
  const dbUri = `mongodb://${dbHostname}:${dbPort}/${dbName}?authSource=admin`

  const databaseConfig = {
    dbUri,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  }

  const { error, value: validatedDBConfig }: Joi.ValidationResult = schema.validate(databaseConfig)

  if (error) {
    throw new Error(`Invalid Config Database! message: ${error.message}`)
  }

  try {
    return await mongoose.connect(validatedDBConfig.dbUri, validatedDBConfig.options)
  } catch (error) {
    throw new Error('Some get wrong when try to connect MongoDB')
  }
}
