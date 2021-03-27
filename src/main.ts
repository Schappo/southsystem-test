import app from './server'
import dotenv from 'dotenv'
import { connectDB } from '@config/database'

dotenv.config()

const boostrap = () => {
  const { PORT } = process.env
  app.listen(PORT, () => console.log(`App is running on PORT: ${PORT}`))
  connectDB()
}

boostrap()
