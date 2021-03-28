import app from './server'
import dotenv from 'dotenv'
import { connectDB } from '@config/database'
import mongoose from 'mongoose'
import userService from './services/user.service'
import { RoleEnum } from './shared/enums'

dotenv.config()

const boostrap = async () => {
  const { PORT, DB_PORT, DB_HOSTNAME, DB_NAME } = process.env

  app.listen(PORT, () => console.log(`App is running on PORT: ${PORT}`))

  const mongooseConnection: typeof mongoose = await connectDB(DB_HOSTNAME, DB_PORT, DB_NAME)

  const bootstrapDBaddAdmin = async () => {
    const userAdmin = await userService.findAll({ role: RoleEnum.ADMIN })
    if (userAdmin.length === 0) {
      await userService.create({
        name: 'admin',
        phone: '00000000000',
        email: 'admin@admin.com',
        password: 'admin',
        age: 0,
        bookmarks: [],
        role: RoleEnum.ADMIN
      })
    }
  }

  await bootstrapDBaddAdmin()

  process.on('uncaughtException', async err => {
    console.error(err.message)
    await mongooseConnection.disconnect()
    process.exit(1)
  })
}

boostrap()
