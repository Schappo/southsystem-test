import app from './server'
import dotenv from 'dotenv'
import { connectDB } from '@config/database'
import mongoose from 'mongoose'

dotenv.config()

const boostrap = async () => {
  const { PORT, DB_PORT, DB_HOSTNAME, DB_NAME } = process.env

  app.listen(PORT, () => console.log(`App is running on PORT: ${PORT}`))

  const mongooseConnection: typeof mongoose = await connectDB(DB_HOSTNAME, DB_PORT, DB_NAME)

  process.on('uncaughtException', async err => {
    console.error(err.message)
    await mongooseConnection.disconnect()
    process.exit(1)
  })
}

boostrap()
